const mongoose = require('mongoose');

const { ObjectId, Schema, model } = mongoose;

const orderSchema = new Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, 'please enter a shipping address'],
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{3}\d{3}\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    postalCode: {
      type: String,
      required: [true, 'please enter a postal Code'],
    },
    country: {
      type: String,
      required: [true, 'please enter a shipping address'],
    },
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a User!'],
  },
  orderItems: [
    {
      name: {
        type: String,
        required: [true, 'Order must have a name'],
      },
      quantity: {
        type: Number,
        required: [true, 'Order must have a quantity'],
      },
      price: {
        type: Number,
        require: [true, 'Booking must have a price.'],
      },
      image: {
        type: String,
        required: [true, 'order must have a image'],
      },
      product: {
        type: ObjectId,
        required: [true, 'order must have a product'],
        ref: 'Product',
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paidAt: {
    type: Date,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'processing',
  },
  deliveredAt: {
    type: Date,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'Product',
    select: 'name',
  });
  next();
});

const Order = model('Order', orderSchema);

module.exports = Order;
