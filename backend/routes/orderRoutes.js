const express = require("express");
const router = express.Router();


const {
  createOrder,
  getOrders,
  getUserOrders   // ✅ add this
} = require("../controllers/orderController");

// ✅ ROUTES
router.post("/", createOrder);
router.get("/", getOrders);
router.get("/user/:id", getUserOrders);
console.log("✅ Order routes loaded");
module.exports = router;