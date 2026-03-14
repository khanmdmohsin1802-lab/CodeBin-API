import { handleUserLogin, handleUserSignup } from "../controller/user.js";
import { validateSignup } from "../middleware/validate.js";
import express from "express";

const router = express.Router();

router.post("/signup", validateSignup, handleUserSignup);
router.post("/login", handleUserLogin);

export default router;
