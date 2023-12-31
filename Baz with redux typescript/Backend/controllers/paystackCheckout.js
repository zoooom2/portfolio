const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const crypto = require('crypto');
const Order = require('../models/orderModel');
const Product = require('../models/productsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getUniqueValues = require('../utils/uniqueValues');
const { sendMail } = require('../utils/email');
const { emailOrderTemplate } = require('../utils/templates');

const arrangeCart = (orderItems) => {
  const uniqueID = getUniqueValues(orderItems, 'productID');
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

  return newOrderItems;
};

const composeOrderDetails = ({ data, newOrderItems }) => {
  let content = '';

  newOrderItems.forEach((item) => {
    content += `<tr><td>${item.productName}</td><td>${
      item.totalQuantity
    }</td><td>${item.totalQuantity * item.price}</td></tr>`;
  });

  const replacements = {
    '%FIRSTNAME%': data.metadata.shippingInfo.firstName,
    '%LASTNAME%': data.metadata.shippingInfo.lastName,
    '%REFERENCE%': data.reference.toUpperCase(),
    '%DATE%': new Date(data.created_at).toLocaleString('en-GB'),
    '%ORDERS%': content,
    '%PHONE%': data.metadata.shippingInfo.phoneNumber,
    '%EMAIL%': data.metadata.shippingInfo.email,
    '%ADDRESS%': data.metadata.shippingInfo.address,
    '%CITY%': data.metadata.shippingInfo.city,
    '%STATE%': data.metadata.shippingInfo.state,
    '%SUBTOTAL%': data.metadata.subtotal,
    '%SHIPPING_FEE%': data.metadata.shippingInfo.shippingFee,
    '%TOTAL%': data.metadata.subtotal + data.metadata.shippingInfo.shippingFee,
    '%ADDITIONAL_INFO%': data.metadata.shippingInfo.additionalInfo,
  };
  let updatedTemplate = emailOrderTemplate;

  Object.keys(replacements).forEach((key) => {
    updatedTemplate = updatedTemplate.replace(
      new RegExp(key, 'g'),
      replacements[key]
    );
  });

  return updatedTemplate;
};

const updateStock = (orderItems) => {
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
};

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber } = req.body.shippingInfo;
  const helper = new paystack.FeeHelper();

  //1) Initialize the transaction
  const session = await paystack.transaction.initialize({
    first_name: firstName,
    last_name: lastName,
    phone: phoneNumber,
    email,
    amount: helper.addFeesTo(req.body.total_amount * 100),
    metadata: { ...req.body },
  });

  res.status(200).json({ data: session.data.authorization_url });
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

exports.payStackWebHook = catchAsync(async (req, res, next) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    next(new AppError(400, 'invalid signature'));
  }
  const { event, data } = req.body;
  const {
    orderItems,
    shippingInfo,
    subtotal,
    total_items: totalItems,
  } = data.metadata;

  if (event === 'charge.success') {
    const newOrderItems = arrangeCart(orderItems);

    const order = await Order.create({
      shippingInfo,
      additionalInfo: shippingInfo.additionalInfo,
      total_amount: subtotal + shippingInfo.shippingFee,
      subtotal,
      total_items: totalItems,
      orderItems: newOrderItems,
      paidAt: data.paid_at,
      createdAt: data.created_at,
      paymentInfo: {
        reference: data.reference,
        channel: data.channel,
        status: data.status,
        gateway: 'PAYSTACK',
      },
    });

    if (!order) {
      next(new AppError('Could not create order. Please try again.', 400));
    }
    const updatedTemplate = composeOrderDetails({ data, newOrderItems });

    sendMail({
      emailAddress: shippingInfo.email,
      subject: 'ORDER DETAILS',
      text: JSON.stringify(order),
      html: updatedTemplate,
    });
    updateStock(orderItems);
    console.log('here');
    res.redirect('https://bazofficial.com/order?type=success');
  } else {
    res.status(200).json({ data });
  }
});
