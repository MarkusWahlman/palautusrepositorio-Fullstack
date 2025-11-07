import { Router } from "express";
import { blogsController } from "../controllers/blogController";
import { tokenExtractor } from "../middlewares/tokenExtractor";

const router = Router();

router.get("/", blogsController.get);

router.get("/:id", blogsController.getById);

router.post("/", tokenExtractor, blogsController.create);

router.put("/:id", blogsController.updateLikes);

router.delete("/:id", tokenExtractor, blogsController.remove);

export { router as blogsRouter };
