import mongoose from "mongoose";
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});
export default mongoose.model("products", productSchema);
