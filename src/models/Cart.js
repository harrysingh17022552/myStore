import mongoose from "mongoose";
const cartSchema = mongoose.Schema({
  product_id: { type: Object, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  stock: { type: Number, required: true },
});
export default mongoose.model("carts", cartSchema);
