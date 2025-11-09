import express from "express";
import auth from "../middleware/auth.js";
import {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
  likePost,
  commentOnPost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.put("/:id", auth, editPost);
router.post("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentOnPost);

export default router;
