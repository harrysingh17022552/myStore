import mongoose from "mongoose";
const cartSchema = mongoose.Schema({
  product_id: { type: Object, required: true },
  quantity: { type: Number, required: true, default: 1 },
});
export default mongoose.model("carts", cartSchema);
