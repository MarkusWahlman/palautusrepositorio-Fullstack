import { Request, Response } from "express";
import { Blog } from "../models/blog";
import { User } from "../models/user";

export const blogController = {
  async getAllBlogs(req: Request, res: Response) {
    try {
      const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
      });
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  },

  async createBlog(req: Request, res: Response) {
    try {
      const body = req.body;

      const user = await User.findById(req.user.id);
      if (!user) {
        res.status(400).json({ error: "userId missing or not valid" });
        return;
      }

      const blogData = { ...body };
      delete blogData.userId;
      const blog = new Blog({
        ...blogData,
        user: user.id,
      });
      const savedBlog = await blog.save();

      if (user.blogs) {
        user.blogs = user.blogs.concat(savedBlog.id);
      } else {
        user.blogs = [savedBlog.id];
      }
      await user.save();

      res.status(201).json(savedBlog);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to save blog" });
    }
  },

  async updateBlog(req: Request, res: Response) {
    try {
      const blogId = req.params.id;

      const blog = await Blog.findById(blogId);

      if (!blog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }

      if (blog.user.toString() !== req.user.id.toString()) {
        res.status(403).json({ error: "Unauthorized to update this blog" });
        return;
      }

      const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
        new: true,
      });

      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: "Failed to update blog" });
    }
  },

  async deleteBlog(req: Request, res: Response) {
    try {
      const blogId = req.params.id;

      const blog = await Blog.findById(blogId);

      if (!blog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }

      if (blog.user.toString() !== req.user.id.toString()) {
        res.status(403).json({ error: "Unauthorized to delete this blog" });
        return;
      }

      await blog.deleteOne();

      res.status(200).json({ message: "Blog deleted successfully" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete blog" });
    }
  },
};
