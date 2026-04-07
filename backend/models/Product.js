// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String, required: true }, // store uploaded file name or path
  seller: { type: String, required: true } // store seller ID
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);