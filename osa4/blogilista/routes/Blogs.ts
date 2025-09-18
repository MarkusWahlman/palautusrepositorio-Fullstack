import { Router } from "express";
import { blogController } from "../controllers/BlogController";
import { tokenExtractor } from "../middleware/auth";

const router = Router();

router.get("/", blogController.getAllBlogs);

router.post("/", tokenExtractor, blogController.createBlog);
router.patch("/:id", tokenExtractor, blogController.updateBlog);
router.delete("/:id", tokenExtractor, blogController.deleteBlog);
router.patch("/:id/like", blogController.likeBlog);

export { router as blogsRouter };
