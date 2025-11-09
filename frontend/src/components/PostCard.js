import React, { useState } from "react";
import { FaHeart } from "react-icons/fa"

const PostCard = ({ post, user, onLike, onDelete, onComment, onEdit }) => {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onComment(comment);
    setComment("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editText.trim()) return;
    onEdit(editText);
    setIsEditing(false);
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const postUserId = post.user?._id || post.user?.id || post.user;
  const currentUserId = user._id || user.id;
  const isOwner = postUserId === currentUserId;

  const likedByUser = post.likes?.some(
    (likeUserId) => likeUserId === currentUserId
  );

  return (
    <div className="post-card">
      <div className="post-header">
        <div>
          <strong>{post.user?.name || post.user}</strong>
          <div className="post-time">
            <small> Created: {formatDate(post.createdAt)}</small>
            {post.updatedAt && post.updatedAt !== post.createdAt && (
              <small style={{ marginLeft: "10px", color: "gray" }}>
                 Updated: {formatDate(post.updatedAt)}
              </small>
            )}
          </div>
        </div>

        {isOwner && (
          <div className="post-controls">
            {!isEditing ? (
              <>
                <button onClick={() => setIsEditing(true)}> Edit</button>
                <button onClick={onDelete} style={{ color: "red" }}>
                  🗑 Delete
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(false)}> Cancel</button>
            )}
          </div>
        )}
      </div>

      {!isEditing ? (
        <p className="post-text">{post.text}</p>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows="3"
            className="edit-textarea"
          />
          <button type="submit">💾 Save</button>
        </form>
      )}

      <div className="post-actions">
        <button
          className={`like-btn ${likedByUser ? "liked" : ""}`}
          onClick={onLike}
        >
          <FaHeart className="heart-icon" />
          <span>{post.likes?.length || 0}</span>
        </button>
      </div>

      <div className="comments">
        {post.comments.map((c) => (
          <div key={c._id} className="comment">
            <strong>{c.user?.name || "Unknown"}</strong>
            <span className="comment-text">{c.text}</span>
            <div className="comment-meta">
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </div>
        ))}

        <form onSubmit={handleComment}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default PostCard;

