const PORT = 5000;
import express from "express";
import connectDB from "./DBConnection.js";
const app = express();
connectDB();
app.listen(PORT, () => {
  console.log(`Your backend server is running on port number ${PORT}`);
});
