import express from "express";
import {
  handleCreateSnippet,
  handleGetSnippet,
  handleDeleteSnippet,
  handleGetMySnippet,
} from "../controller/snippet.js";
import { restrictedToLoggedinUserOnly } from "../middleware/auth.js";

const router = express.Router();

//restricted routes
router.post("/", restrictedToLoggedinUserOnly, handleCreateSnippet);
router.delete("/:shortId", restrictedToLoggedinUserOnly, handleDeleteSnippet);

router.get("/me", restrictedToLoggedinUserOnly, handleGetMySnippet);

//public routes
router.get("/:shortId", handleGetSnippet);

export default router;
