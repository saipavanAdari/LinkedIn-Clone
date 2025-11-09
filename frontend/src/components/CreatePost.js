import React, { useState } from "react";

const CreatePost = ({ user, addPost }) => {
  const [content, setContent] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const newPost = {
      id: Date.now(),
      user: user,
      text: content,
      time: new Date().toLocaleString(),
      likes: 0,
      comments: [],
    };
    addPost(newPost);
    setContent("");
  };

  return (
    <div className="create-post">
      <textarea
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default CreatePost;
