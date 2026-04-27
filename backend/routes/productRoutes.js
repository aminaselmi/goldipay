// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts
} = require("../controllers/productController");

// Multer storage configuration

const upload = require("../config/multer"); // ✅ NEW

// ROUTES

// Create product with image upload
router.post("/", upload.single("image"), createProduct);

// Get all products
router.get("/", getProducts);

// Update product (with optional image upload)
router.put("/:id", upload.single("image"), updateProduct);


// Bulk delete products
router.delete("/bulk", bulkDeleteProducts);

// Delete single product
router.delete("/:id", deleteProduct);

module.exports = router;