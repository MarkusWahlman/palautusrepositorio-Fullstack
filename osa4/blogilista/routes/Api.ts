import { Router } from "express";
import { blogsRouter } from "./Blogs";
import { usersRouter } from "./Users";
import { loginRouter } from "./Login";

const router = Router();

router.use("/blogs", blogsRouter);
router.use("/users", usersRouter);
router.use("/login", loginRouter);

export { router as apiRouter };
