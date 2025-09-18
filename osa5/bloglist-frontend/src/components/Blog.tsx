import { useState } from "react";
import type { BlogDataType } from "../types/blog";
import blogService from "../services/blogs";
import { useAuth } from "../hooks/useAuth";

interface BlogProps {
  blog: BlogDataType;
  onDelete: (id: string) => void;
  onLike?: (id: string) => void;
}

const Blog = ({ blog, onDelete, onLike }: BlogProps) => {
  const [showMore, setShowMore] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const { user } = useAuth();

  const handleLike = async () => {
    if (onLike) {
      onLike(blog.id);
    }

    const updatedBlog = await blogService.like(blog.id);
    setLikes(updatedBlog.likes);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}" by "${blog.author}"`,
    );
    if (!confirmed) return;

    try {
      if (!user) return;
      await blogService.deleteBlog(blog.id, user.token);
      onDelete(blog.id);
    } catch {
      //
    }
  };

  const isOwner = user?.id === blog.user?.id;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <h3>{blog.title}</h3>
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Hide" : "Show more"}
      </button>
      {showMore && (
        <div>
          <p>Author: {blog.author}</p>
          <p>Likes: {likes}</p>
          <button onClick={handleLike}>Like</button>
          <p>URL: {blog.url}</p>
        </div>
      )}
      {isOwner && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
};

export default Blog;
