import { useEffect, useState } from "react";
import type { BlogDataType } from "../types/blog";
import Blog from "./Blog";

interface BlogProps {
  initialBlogs: BlogDataType[];
}

const BlogsList = ({ initialBlogs }: BlogProps) => {
  const [blogs, setBlogs] = useState(initialBlogs);

  useEffect(() => {
    setBlogs(initialBlogs || []);
  }, [initialBlogs]);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const handleDelete = (id: string) => {
    setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== id));
  };

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onDelete={handleDelete} />
      ))}
    </div>
  );
};
export default BlogsList;
