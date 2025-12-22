import express from "express";
import { Register, LogIn } from "../controllers/Auth.js";
const router = express.Router();
router.route("/registration").post(Register);
router.route("/login").post(LogIn);
export default router;
