const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

//app.use("/products", require("./routes/productRoutes"));


const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);


const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

app.use("/uploads", express.static("uploads"));


const orderRoutes = require("./routes/orderRoutes");

app.use("/api/order", orderRoutes);


app.get("/", (req, res) => {
  res.send("GoldiPay API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

