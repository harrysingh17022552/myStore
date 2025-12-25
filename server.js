const PORT = 5000;
import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./src/DB/DBConnection.js";
import Auth from "./src/routes/Auth.js";
import Product from "./src/routes/Product.js";
import Cart from "./src/routes/Cart.js";
const app = express();
//DB connection
connectDB();
//loads environment variables
configDotenv();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", Auth);
app.use("/", Product);
app.use("/", Cart);

app.listen(PORT, () => {
  console.log(`Your backend server is running on port number ${PORT}`);
});
