const fetch = require('node-fetch');
const CC = require('currency-converter-lt');
const Product = require('../models/productsModel');
const catchAsync = require('../utils/catchAsync');

const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
const base =
  process.NODE_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

// generate access token for the payment
// create order
// capture payment

const currencyConverter = new CC();
const ratesCacheOptions = {
  isRatesCaching: true,
  ratesCacheDuration: 3600,
};
currencyConverter.setupRatesCache(ratesCacheOptions);
const handleResponse = async (response) => {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
};

const generateAccessToken = async () => {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    'base64'
  );
  const response = await fetch(`${base}/v2/oauth2/token`, {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
};

exports.createOrder = catchAsync(async (req, res) => {
  // destructure the data

  const amount = req.body.totalPrice.toString();

  const cart = await Promise.all(
    req.body.orderItems.map(async (item) => {
      const product = await Product.findById(item.productID);
      const convertedPrice = await currencyConverter
        .from('USD')
        .to('GBP')
        .amount(product.price)
        .convert();
      return {
        name: product.productName,
        unit_amount: { currency_code: 'USD', value: convertedPrice },
        description: product.description,
        quantity: item.quantity,
        tax: { currency_code: 'USD', value: product.taxPrice },
      };
    })
  );

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
            // this is where to add handling fee, total disocunt, etc
            breakdown: { shipping: req.body.shipping },
          },
          items: cart,
          shipping: {
            address: {
              countryCode: req.body.shippingInfo,
              address: req.body.shippingInfo.address_line_1,
              city: req.body.shippingInfo.admin_area_1,
              postal_code: req.body.shippingInfo.postalCode,
            },
            name: { full_name: req.body.shippingInfo.name },
            payee: {
              email_address: 'www.bazng@gmail.com',
            },
          },
        },
      ],
    }),
  });

  return handleResponse(response);
});

exports.capturePayment = async (orderId) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
};
