import mongoose from "mongoose";
//Product Schema, which have field : name, description, price and stock. Here we kept all field mandatory except description with their respective type
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});
export default mongoose.model("products", productSchema);
