import { Request, Response } from "express";
import { Blog } from "../models/blog";

export const blogController = {
  async getAllBlogs(req: Request, res: Response) {
    try {
      const blogs = await Blog.find({});
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  },

  async createBlog(req: Request, res: Response) {
    try {
      const blog = new Blog(req.body);
      const savedBlog = await blog.save();
      res.status(201).json(savedBlog);
    } catch (error) {
      res.status(400).json({ error: "Failed to save blog" });
    }
  },

  async updateBlog(req: Request, res: Response) {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

      if (!updatedBlog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }

      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: "Failed to update blog" });
    }
  },

  async deleteBlog(req: Request, res: Response) {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

      if (!deletedBlog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }

      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog" });
    }
  },
};
