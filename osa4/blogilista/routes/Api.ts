import { Router } from "express";
import { blogsRouter } from "./Blogs";
import { usersRouter } from "./Users";
import { loginRouter } from "./Login";
import { testingRouter } from "./Testing";

const router = Router();

router.use("/blogs", blogsRouter);
router.use("/users", usersRouter);
router.use("/login", loginRouter);
router.use("/testing", testingRouter);

export { router as apiRouter };
