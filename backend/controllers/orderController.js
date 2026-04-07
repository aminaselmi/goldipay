const Order = require("../models/Order");

// ✅ CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      totalPrice,
      paymentMethod,
      paymentDetails
    } = req.body;
    console.log("BODY:", req.body);
     console.log(user)

    // 🔥 basic validation
    if (!user || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = new Order({
      user,
      items,
      totalPrice,
      paymentMethod: paymentMethod || "edahabia",

      // ✅ edahabia = paid (simulation)
      isPaid: true,

      paymentDetails: {
        cardLast4: paymentDetails?.cardLast4,
        expiry: paymentDetails?.expiry
      },

      status: "paid"
    });

    const saved = await order.save();

    res.status(201).json(saved);

  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ message: err.message });
  }
};


// ✅ GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // 🔥 get user info
      .populate("items.product");     // 🔥 get product info

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET USER ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id })
      .populate("items.product");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};