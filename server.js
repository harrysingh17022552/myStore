const PORT = 5000;
import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./src/DB/DBConnection.js";
import Auth from "./src/routes/Auth.js";
const app = express();
connectDB();
configDotenv();

// middleware
app.use(express.json());
// routes
app.use("/", Auth);
app.listen(PORT, () => {
  console.log(`Your backend server is running on port number ${PORT}`);
});
