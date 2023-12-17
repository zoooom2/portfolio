const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.orderPerTime = factory.getTotalModelPerTime(Order, [
  { field: 'Total Items Ordered', acc: '$total_items' },
  { field: 'Total Sale', acc: '$total_amount' },
]);

exports.percentageChangeOrder = factory.percentageChangeModel(Order, [
  { field: 'Total Items Ordered', acc: '$total_items' },
  { field: 'Total Sale', acc: '$total_amount' },
  { field: 'Total Orders', acc: 1 },
]);

const pickTime = (period) => {
  let dateFilter = {};

  if (period === 'today') {
    dateFilter = {
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
    };
  } else if (period === 'weekly') {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );

    dateFilter = {
      createdAt: {
        $gte: startOfWeek,
        $lt: endOfWeek,
      },
    };
  } else if (period === 'monthly') {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );

    dateFilter = {
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    };
  } else if (period === 'yearly') {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const endOfYear = new Date(new Date().getFullYear(), 12, 0);

    dateFilter = {
      createdAt: {
        $gte: startOfYear,
        $lt: endOfYear,
      },
    };
  }
  return dateFilter;
};

exports.aggregateOrders = catchAsync(async (req, res) => {
  const data = await Order.aggregate([
    {
      $match: pickTime(req.query.period),
    },
    {
      $unwind: '$orderItems',
    },
    {
      $unwind: '$orderItems.sizes',
    },
    {
      $group: {
        _id: {
          productName: '$orderItems.productName',
          size: '$orderItems.sizes.size',
        },
        totalQuantity: { $sum: '$orderItems.sizes.quantity' },
      },
    },
    {
      $group: {
        _id: '$_id.productName',
        sizes: {
          $push: {
            size: '$_id.size',
            quantity: '$totalQuantity',
          },
        },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'productName',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $group: {
        _id: '$productDetails.collectionName',

        totalItemsSold: {
          $sum: {
            $sum: '$sizes.quantity',
          },
        },
        products: {
          $push: {
            productName: '$_id',
            sizes: '$sizes',
            images: '$productDetails.images',
            price: '$productDetails.price',
          },
        },
      },
    },
  ]);

  res.status(200).json({ data });
});

exports.bestSellers = catchAsync(async (req, res) => {
  const data = await Order.aggregate([
    {
      $match: pickTime(req.query.period),
    },
    {
      $unwind: '$orderItems',
    },
    {
      $unwind: '$orderItems.sizes',
    },
    {
      $group: {
        _id: {
          productName: '$orderItems.productName',
          size: '$orderItems.sizes.size',
        },
        totalQuantity: { $sum: '$orderItems.sizes.quantity' },
      },
    },
    {
      $group: {
        _id: '$_id.productName',
        sizes: {
          $push: {
            size: '$_id.size',
            quantity: '$totalQuantity',
          },
        },
        totalQuantitySold: { $sum: '$totalQuantity' },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'productName',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $project: {
        productName: '$_id',
        totalQuantitySold: 1,
        sizes: 1,
        collectionName: '$productDetails.collectionName',
        productImage: '$productDetails.images',
        price: '$productDetails.price',
      },
    },
    {
      $sort: {
        totalQuantitySold: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  res.status(200).json({ data });
});

exports.getMyOrders = factory.getMine(Order);
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
