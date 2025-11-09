const express = require("express");
const auth = require("../middleware/auth");
const {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
  likePost,
  commentOnPost,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.put("/:id", auth, editPost);
router.post("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentOnPost);

module.exports = router;
