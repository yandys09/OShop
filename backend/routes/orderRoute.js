const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/orders")
  .post(isAuthenticated, newOrder)
  .get(isAuthenticated, myOrders);

router
  .route("/orders/:id")
  .get(isAuthenticated, authorizeRoles("admin", "user"), getSingleOrder);

router
  .route("/authorize/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);

router
  .route("/authorize/orders/:id")
  .delete(isAuthenticated, authorizeRoles("admin", "user"), deleteOrder)
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder);

module.exports = router;
