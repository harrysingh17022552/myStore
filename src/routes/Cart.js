import express from "express";
import Verify from "../middlewares/JwtIsVerifying.js";
import Validate from "../middlewares/validateId.js";
import {
  getCartItem,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../controllers/Cart.js";
const router = express.Router();
router.route("/cart").get(Verify, getCartItem);
router
  .route("/cart/:id")
  .post(Validate, Verify, addCartItem)
  .patch(Validate, Verify, updateCartItem)
  .delete(Validate, Verify, deleteCartItem);
router.route("/clear_cart").delete(Verify, clearCart);
export default router;
