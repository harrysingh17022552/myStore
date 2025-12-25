import express from "express";
import { Register, LogIn } from "../controllers/Auth.js";
const router = express.Router();
// route for user registration, that will be having info in request body and then this info will posted in DB via controller.
router.route("/register").post(Register);
// route for user login, this will be having email and password in body, that will validate uia controller and return with access token
router.route("/login").post(LogIn);
export default router;
