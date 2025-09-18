import { useState } from "react";
import blogService from "../services/blogs";
import type { BlogDataType } from "../types/blog";
import { useAuth } from "../hooks/useAuth";

interface AddBlogProps {
  onBlogAdded: (blog: BlogDataType) => void;
}

const AddBlog = ({ onBlogAdded }: AddBlogProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const { user } = useAuth();

  const handleAddBlog = async (event: React.FormEvent) => {
    event.preventDefault();

    const newBlog = { title, author, url, likes: 0 };
    try {
      const response = await blogService.create(newBlog, user!.token);
      onBlogAdded(response);

      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.error("Failed to add blog", error);
    }
  };

  return (
    <form onSubmit={handleAddBlog}>
      <h3>Add a new blog</h3>

      <div>
        Title:{" "}
        <input
          aria-label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        Author:{" "}
        <input
          aria-label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        URL:{" "}
        <input
          aria-label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default AddBlog;
