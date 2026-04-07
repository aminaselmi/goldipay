const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    role: {
      type: String,
      enum: ["client", "seller", "admin"],
      default: "client",
    },
    // Seller extra fields (optional)
    storeName: { type: String },
    businessType: { type: String },
    storeDescription: { type: String },
    storeAddress: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);