import mongoose from "mongoose";
// Cart Schema, that have product_id and quantity.
// Here we will be not storing whole product instead we used foreign key attached to product_id so when ever this item will need product detail it will join table and get it normalized manner.
const cartSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products", //fk
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
});
export default mongoose.model("carts", cartSchema);
