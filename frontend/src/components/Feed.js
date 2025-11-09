import React, { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import {
  getAllPosts,
  createPost as apiCreatePost,
  likePost,
  deletePost as apiDeletePost,
  commentPost,
  updatePost,
} from "../api";

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getAllPosts({ limit: 50 });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addPost = async (newPostData) => {
    try {
      const res = await apiCreatePost(newPostData);
      setPosts((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await likePost(postId);
      setPosts((prev) =>
        prev.map((p) => (p._id === res.data._id ? res.data : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await apiDeletePost(postId);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

const handleComment = async (postId, text) => {
  try {
    const res = await commentPost(postId, text);
    setPosts((prev) =>
      prev.map((p) => (p._id === res.data._id ? res.data : p))
    );
  } catch (err) {
    console.error(err);
  }
};


  const handleEdit = async (postId, text) => {
    try {
      const res = await updatePost(postId, { text });
      setPosts(
        (prev) => prev.map((p) => (p._id === res.data._id ? res.data : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="feed">
      <CreatePost user={user} addPost={(p) => addPost(p)} />
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <div className="empty">No posts yet</div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            user={user}
            onLike={() => handleLike(post._id)}
            onDelete={() => handleDelete(post._id)}
            onComment={(c) => handleComment(post._id, c)}
            onEdit={(text) => handleEdit(post._id, text)}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
