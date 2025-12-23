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

router
  .route("/product/:id")
  .get(Validate, getProduct)
  .put(Verify, Validate, updateProduct)
  .delete(Verify, Validate, deleteProduct);
router.route("/products").get(getAllProducts);
router.route("/product").post(Verify, addProduct);
export default router;
