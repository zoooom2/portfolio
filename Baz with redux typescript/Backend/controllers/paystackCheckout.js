const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const crypto = require('crypto');
const Order = require('../models/orderModel');
const Product = require('../models/productsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getUniqueValues = require('../utils/uniqueValues');
const { sendMail } = require('../utils/email');
const { emailOrderTemplate } = require('../utils/templates');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email } = req.body.shippingInfo;
  const helper = new paystack.FeeHelper();
  const name = `${firstName} ${lastName}`;

  //1) Initialize the transaction
  const session = await paystack.transaction.initialize({
    name,
    email,
    callback_url:
      process.env.NODE_ENV === 'production'
        ? `${process.env.CLIENT_URL}/order`
        : `${process.env.LOCAL_CLIENT_URL}/order`,
    amount: helper.addFeesTo(req.body.total_amount * 100),
    metadata: { ...req.body },
  });

  res.status(200).json({ data: session.data.authorization_url });
});

// const verifyPaystackTransaction = (reference) => async (req, res, next) => {
//   const verification = await paystack.transaction.verify({ reference });

//   if (verification.data.status !== 'success') {
//     next(new AppError('payment transaction verification failed', 401));
//   } m
//   return verification;
// };

exports.createOrder = catchAsync(async (req, res, next) => {
  //2) Verify the transaction
  // const verification = await verifyPaystackTransaction(req.body.reference);
  const verification = await paystack.transaction.verify({
    reference: req.body.reference,
  });

  if (verification.data.status !== 'success') {
    next(new AppError('payment transaction verification failed', 401));
  }

  const orderItems = req.body.cart;

  const uniqueID = getUniqueValues(orderItems, 'productID');

  // pick the unique id, check each of the order items for any with the same unique ID, if it is the first copy all of its content into an object else just size and quantity into the sizes array
  const newOrderItems = uniqueID.map((id) => {
    const itemsWithSameID = orderItems.filter((item) => item.productID === id);

    const baseObject = itemsWithSameID.reduce(
      (acc, item) => {
        acc.productID = id;
        acc.productName = item.productName;
        acc.price = item.price;
        acc.image = item.image;
        acc.sizes.push({
          size: item.size,
          quantity: item.amount,
        });
        acc.totalQuantity += item.amount;
        return acc;
      },
      {
        productName: '',
        price: 0,
        totalQuantity: 0,
        image: '',
        sizes: [],
        productID: '',
      }
    );

    return baseObject;
  });
  //3) create the order

  const { shippingInfo, subtotal, total_items: totalItems } = req.body;

  const order = await Order.create({
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    shippingInfo,
    additionalInfo: shippingInfo.additionalInfo,
    total_amount: subtotal + shippingInfo.shippingFee,
    subtotal,
    total_items: totalItems,
    orderItems: newOrderItems,
    paidAt: verification.data.paid_at,
    createdAt: verification.data.created_at,
    paymentInfo: {
      reference: verification.data.reference,
      channel: verification.data.channel,
      status: verification.data.status,
      gateway: 'PAYSTACK',
    },
  });

  if (!order) {
    next(new AppError('Could not create order. Please try again.', 400));
  }

  let content = '';

  newOrderItems.forEach((item) => {
    content += `<tr><td>${item.productName}</td><td>${
      item.totalQuantity
    }</td><td>${item.totalQuantity * item.price}</td></tr>`;
  });

  const replacements = {
    '%FIRSTNAME%': shippingInfo.firstName,
    '%LASTNAME%': shippingInfo.lastName,
    '%REFERENCE%': verification.data.reference.toUpperCase(),
    '%DATE%': new Date(verification.data.created_at).toLocaleString('en-GB'),
    '%ORDERS%': content,
    '%PHONE%': shippingInfo.phoneNumber,
    '%EMAIL%': shippingInfo.email,
    '%ADDRESS%': shippingInfo.address,
    '%CITY%': shippingInfo.city,
    '%STATE%': shippingInfo.state,
    '%SUBTOTAL%': subtotal,
    '%SHIPPING_FEE%': shippingInfo.shippingFee,
    '%TOTAL%': subtotal + shippingInfo.shippingFee,
    '%ADDITIONAL_INFO%': shippingInfo.additionalInfo,
  };
  let updatedTemplate = emailOrderTemplate;

  Object.keys(replacements).forEach((key) => {
    updatedTemplate = updatedTemplate.replace(
      new RegExp(key, 'g'),
      replacements[key]
    );
  });

  sendMail({
    emailAddress: shippingInfo.email,
    subject: 'ORDER DETAILS',
    text: JSON.stringify(order),
    html: updatedTemplate,
  });

  //4) update the stock of each product

  orderItems.forEach(async (item) => {
    const product = await Product.findById(item.productID);
    const index = product.sizes.findIndex(
      (productSize) => productSize.size === item.size
    );
    product.sizes[index] = {
      size: item.size,
      quantity: product.sizes[index].quantity - item.amount,
      custom: product.sizes[index].custom,
    };
    product.save();
  });

  // 5) Create session as response
  res.status(200).json({
    status: 'success',
    order,
  });
});

exports.updatePayStackOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  const { status } = req.query;
  const verified = await paystack.transaction.verify({
    reference: order.paymentInfo.reference,
  });

  if (verified.data.status !== 'success')
    next(new AppError('invalid payment reference', 401));

  const { orderStatus, deliveredAt } = req.body;
  req.body = { orderStatus, deliveredAt };

  if (status === 'completed') {
    order.status = 'completed';
    order.deliveredAt = Date.now();
  } else {
    order.orderStatus = status;
  }
  order.save({ new: true });
  res.status(200).json({ status: 'success', order });
});

exports.payStackWebHook = catchAsync(async (req, res) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');
  if (hash === req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const event = req.body;
    console.log(event);
  }

  res.status(200).json({});
});

// exports.filterUpdateOrder = catchAsync(async (req, res, next) => {
//   const { orderStatus, deliveredAt } = req.body;
//   req.body = { orderStatus, deliveredAt };
//   next();
// });
