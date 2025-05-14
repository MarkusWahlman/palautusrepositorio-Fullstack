import { Router } from "express";
import { blogsRouter } from "./Blogs";
import { usersRouter } from "./Users";

const router = Router();

router.use("/blogs", blogsRouter);
router.use("/users", usersRouter);

export { router as apiRouter };
