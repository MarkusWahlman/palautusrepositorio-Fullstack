import { useEffect, useRef, useState } from "react";
import blogService from "../services/blogs";
import type { BlogDataType } from "../types/blog";
import { useAuth } from "../hooks/useAuth";
import BlogsList from "../components/BlogsList";
import AddBlog from "../components/AddBlog";
import Togglable, { type TogglableRef } from "../components/Togglable";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogDataType[]>([]);
  const { user, logout } = useAuth();
  const fetchBlogs = async () => {
    const response = await blogService.getAll();
    setBlogs(response.data);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const blogFormRef = useRef<TogglableRef>(null);

  const onBlogAdded = async () => {
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility();
    }
    fetchBlogs();
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>{user!.name} logged in</p>
      <Togglable buttonLabel="new form" ref={blogFormRef}>
        <AddBlog onBlogAdded={onBlogAdded} />
      </Togglable>
      <BlogsList initialBlogs={blogs} />
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};

export default BlogsPage;
