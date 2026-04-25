// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts
} = require("../controllers/productController");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

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