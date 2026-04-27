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

//app.use("/uploads", express.static("uploads"));


const orderRoutes = require("./routes/orderRoutes");

app.use("/api/order", orderRoutes);

app.use(cors({
   origin: true,
  credentials: true
}));

//app.get("/", (req, res) => {
  //res.send("GoldiPay API is running...");
//});



const path = require("path");

//Serve React build (go one level up)
app.use(express.static(path.join(__dirname, "../build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
 
console.log("Cloudinary test:", require("./config/cloudinary"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);