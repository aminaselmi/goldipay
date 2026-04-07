// controllers/productController.js
const Product = require("../models/Product");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, seller } = req.body;

    // Handle uploaded file
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = new Product({
      title,
      description,
      price,
      category,
      stock,
      seller,
      image
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // If a new image is uploaded, use it
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: err.message });
  }
};

// BULK DELETE PRODUCTS
exports.bulkDeleteProducts = async (req, res) => {
  try {
    const { productIds } = req.body;
    await Product.deleteMany({ _id: { $in: productIds } });
    res.json({ message: "Products deleted successfully" });
  } catch (err) {
    console.error("Error bulk deleting products:", err);
    res.status(500).json({ message: err.message });
  }
};