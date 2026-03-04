import express from "express";
import {
  handleCreateSnippet,
  handleGetSnippet,
  handleDeleteSnippet,
  handleGetMySnippet,
  handleRole,
} from "../controller/snippet.js";
import {
  restrictedToLoggedinUserOnly,
  restrictTo,
} from "../middleware/auth.js";

const router = express.Router();

//restricted routes
router.post("/", restrictedToLoggedinUserOnly, handleCreateSnippet);
router.delete("/:shortId", restrictedToLoggedinUserOnly, handleDeleteSnippet);

router.get("/me", restrictedToLoggedinUserOnly, handleGetMySnippet);

router.get(
  "/admin/all",
  restrictedToLoggedinUserOnly,
  restrictTo(["ADMIN"]),
  handleRole,
);

//public routes
router.get("/:shortId", handleGetSnippet);

export default router;
