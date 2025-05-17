import { Router } from "express";
import { blogController } from "../controllers/BlogController";

const router = Router();

router.get("/", blogController.getAllBlogs);
router.post("/", blogController.createBlog);
router.patch("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

export { router as blogsRouter };
