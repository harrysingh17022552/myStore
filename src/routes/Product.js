import express from "express";
import Validate from "../middlewares/validateId.js";
import Verify from "../middlewares/JwtIsVerifying.js";
import {
  getProduct,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Product.js";
const router = express.Router();

// this route will be having id as params, which will be used by controller to find out product
// this 3 routes will first go through Validate middleware where id will be validated and then go to Verify middleware where user identity will be authenticated
// 1. Get method is used to get product w.r.t to id.
// 2. Here PUT method is used to update whole product.
// &
// 3. DELETE method to remove product from the Products collection.
router
  .route("/product/:id")
  .get(Validate, getProduct)
  .put(Validate, Verify, updateProduct)
  .delete(Validate, Verify, deleteProduct);

// this route will perform GET request, where all product will be provided to client via controller in return, Here not used verify middleware because this route is also common for non signed user.
router.route("/products").get(getAllProducts);
// this route will perform POST request, that will be having product info in body this info will be used by controller to create new record in product collection
router.route("/product").post(Verify, addProduct);
export default router;
