import { handleUserLogin, handleUserSignup } from "../controller/user.js";
import express from "express";

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

export default router;