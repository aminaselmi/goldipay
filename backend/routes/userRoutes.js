const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // <-- make sure this path exists
const { registerUser } = require("../controllers/userController");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

    // 👇 ADD THIS RESPONSE HERE
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;