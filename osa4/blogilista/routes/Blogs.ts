import express, { Router, Request, Response } from "express";
import { Blog } from "../models/blog";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: "Failed to save blog" });
  }
});
  
  export { router as blogsRouter };