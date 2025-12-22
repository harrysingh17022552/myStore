const PORT = 5000;
import express from "express";
const app = express();
app.listen(PORT, () => {
  console.log(`Your backend server is running on port number ${PORT}`);
});
