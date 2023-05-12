const mongoose = require('mongoose');

const { Schema, model } = mongoose;

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
    postCode: {
      type: Number,
      // required: [true, 'please enter a postal Code'],
    },
    country: {
      type: String,
      required: [true, 'please enter a shipping address'],
    },
    shippingFee: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingMethod: {
      type: String,
      required: true,
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
      amount: {
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
      size: {
        type: String,
        required: [true, 'order must have a size'],
      },
      product: {
        type: Schema.ObjectId,
        required: [true, 'order must have a product'],
        ref: 'Product',
      },
    },
  ],
  paymentInfo: {
    reference: {
      type: String,
      required: [true, 'order must have a payment reference'],
      unique: [true, 'two orders cant have the same reference'],
    },
    gateway: {
      type: String,
      required: [true, 'payment should have a gateway'],
    },
    channel: { type: String },
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
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  total_items: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
    default: 0.0,
  },
  total_amount: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['processing', 'shipped', 'completed', 'failed'],
    default: 'processing',
  },
  deliveredAt: {
    type: Date,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstname lastname',
  });
  next();
});

const Order = model('Order', orderSchema);

module.exports = Order;
