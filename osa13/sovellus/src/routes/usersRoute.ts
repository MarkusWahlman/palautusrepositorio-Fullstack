import { Router } from "express";
import { usersController } from "../controllers/userController";

const router = Router();

router.get("/", usersController.getAll);
router.post("/", usersController.create);
router.put("/:username", usersController.updateName);
router.get("/:id", usersController.getById);

export { router as usersRouter };
