import { Router } from "express";
import { userController } from "../controllers/UserController";

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);

export { router as usersRouter };
