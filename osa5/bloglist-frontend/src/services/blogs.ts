import axios from "axios";
import type { NewBlogType } from "../types/blog";
import { toast } from "react-toastify";

const baseUrl = "/api/blogs";

const getAll = async () => {
  return await axios.get(baseUrl);
};

const create = async (newBlog: NewBlogType, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const result = await axios.post(baseUrl, newBlog, config);
    toast.success(`A new blog ${newBlog.title} by ${newBlog.author}`);
    return result.data;
  } catch {
    toast.error(`Error adding new blog ${newBlog.title} by ${newBlog.author}`);
  }
};

const like = async (id: string) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}/like`);
    return response.data;
  } catch {
    toast.error("Failed to like the blog");
  }
};

const deleteBlog = async (id: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch {
    toast.error("Failed to delete");
    throw new Error("Failed to delete");
  }
};

export default { getAll, create, like, deleteBlog };
