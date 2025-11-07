import { catchAsync } from "../utils/catchAsync";
import { blogService } from "../services/blogService";

export const blogsController = {
  get: catchAsync(async (req, res) => {
    const search = req.query.search as string | undefined;
    const blogs = await blogService.getAllBlogs(search);
    res.json(blogs);
  }),

  getById: catchAsync(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id parameter" });
      return;
    }

    const blog = await blogService.getBlogById(id);
    if (blog === null) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.json(blog);
  }),

  create: catchAsync(async (req, res) => {
    if (!req.user) {
      throw new Error("user missing or invalid");
    }

    const { author, url, title, likes, year } = req.body;

    if (
      !url ||
      typeof url !== "string" ||
      !title ||
      typeof title !== "string"
    ) {
      res
        .status(400)
        .json({ error: "url and title are required and must be strings" });
      return;
    }

    if (likes !== undefined && typeof likes !== "number") {
      res.status(400).json({ error: "likes must be a number" });
      return;
    }

    const newBlog = await blogService.createBlog({
      author,
      url,
      title,
      likes,
      year,
      userId: req.user.id,
    });
    res.status(201).json(newBlog);
  }),

  remove: catchAsync(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id parameter" });
      return;
    }

    const blog = await blogService.getBlogById(id);
    if (!blog) {
      res.status(404).json({ error: "blog not found" });
      return;
    }

    if (blog.userId !== req.user!.id) {
      res.status(401).json({ error: "not allowed" });
      return;
    }

    await blogService.deleteBlog(id);
    res.sendStatus(204);
  }),

  updateLikes: catchAsync(async (req, res) => {
    const id = Number(req.params.id);
    const { likes } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id parameter" });
      return;
    }

    if (typeof likes !== "number" || likes < 0) {
      res.status(400).json({ error: "likes must be a non-negative number" });
      return;
    }

    const updatedBlog = await blogService.updateBlogLikes(id, likes);
    if (updatedBlog === null) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    res.json(updatedBlog);
  }),
};
