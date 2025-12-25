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
// this route, perform GET request to get all cart Item, this route will pass through Verify middleware to check user authenticity and after that request will be fulfilled
router.route("/cart").get(Verify, getCartItem);
// this route will be having id as params, which will be used by controller to find out cart item
// this 3 routes will first go through Validate middleware where id will be validated and then go to Verify middleware where user identity will be authenticated
// 1. Here POST method is used to add item in cart.
// SOME MODIFICATION :
// a. here we will not storing whole product in our cart record, instead we will only store its id as a foreign key, so further product detail can be get from product table.
// b. As it is POST request, but we are not passing any thing in body, instead we pass id through url params and here controller can get it from request params
// 2. Here PATCH method is used to update cart Item.
// &
// 3. DELETE method to remove item from the cart.
router
  .route("/cart/:id")
  .post(Validate, Verify, addCartItem)
  .patch(Validate, Verify, updateCartItem)
  .delete(Validate, Verify, deleteCartItem);

//this route, perform DELETE request to delete all item from the cart, this will be also first pass through VERIFY middleware
router.route("/clear_cart").delete(Verify, clearCart);
export default router;
