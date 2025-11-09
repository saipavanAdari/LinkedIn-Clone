import mongoose from "mongoose";
import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const skip = Number(req.query.skip) || 0;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name email")
      .populate("comments.user", "name email");

    res.json(posts);
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    if (!text || !text.trim())
      return res.status(400).json({ message: "Post text is required" });

    const post = new Post({
      user: req.user._id,
      text: text.trim(),
      imageUrl: imageUrl || "",
    });

    await post.save();
    const populated = await Post.findById(post._id).populate(
      "user",
      "name email"
    );
    res.status(201).json(populated);
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.user.equals(req.user._id))
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const editPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.user.equals(req.user._id))
      return res.status(403).json({ message: "Unauthorized" });

    if (text && text.trim()) {
      post.text = text.trim();
      post.updatedAt = new Date();
    }

    await post.save();
    const populated = await Post.findById(post._id)
      .populate("user", "name email")
      .populate("comments.user", "name email");

    res.json(populated);
  } catch (err) {
    console.error("Edit post error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.some((id) => id.equals(req.user._id));
    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => !id.equals(req.user._id));
    } else {
      post.likes.push(req.user._id);
    }

    await post.save({ timestamps: false });

    const populated = await Post.findById(post._id)
      .populate("user", "name email")
      .populate("comments.user", "name email");

    res.json(populated);
  } catch (err) {
    console.error("Like post error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim())
      return res.status(400).json({ message: "Comment text required" });

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid post ID" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user._id, text: text.trim() });
    await post.save({ timestamps: false });

    const populated = await Post.findById(post._id)
      .populate("user", "name email")
      .populate("comments.user", "name email");

    res.json(populated);
  } catch (err) {
    console.error("Comment post error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
