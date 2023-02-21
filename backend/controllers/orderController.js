const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel.js");
const Product = require("../models/productModel");
const User = require("../models/userModel");

exports.newOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.userInfo.userId,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "orderItems.product",
    "title images"
  );
  if (!order) return next(new ErrorHandler("Order not found.", 404));
  res.status(200).json({ success: true, order });
});

exports.myOrders = asyncHandler(async (req, res, next) => {
  const order = await Order.find({ user: req.userInfo.userId }).populate(
    "orderItems.product",
    "title images"
  );
  if (!order) return next(new ErrorHandler("Orders not found.", 404));
  res.status(200).json({ success: true, order, message: "successfully" });
});

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const order = await Order.find().populate(
    "orderItems.product",
    "title images"
  );
  if (!order) return next(new ErrorHandler("Orders not found.", 404));
  res.status(200).json({ success: true, order, message: "successfully" });
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler("Order not found.", 404));
  await order.remove();
  res.status(200).json({ success: true, message: "Delete Successfully!!" });
});

exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler("Order not found.", 404));
  if (order.orderStatus === "Delivered")
    return next(new ErrorHandler("You have already delivered this item", 400));

   if (order.orderStatus === "Processing" && req.body.status === "Delivered")
     return next(new ErrorHandler("Not possible to deliver before shipping.", 400));

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, message: "Update Successfully!!" });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
