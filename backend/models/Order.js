// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // 🔥 link to real user
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.Mixed,
        ref: "Product"
      },
      title: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],

  totalPrice: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    enum: ["edahabia"],
    default: "edahabia"
  },

  paymentDetails: {
    cardLast4: String,
    expiry: String
  },

  isPaid: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: ["pending", "paid", "processing", "shipped", "delivered"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);