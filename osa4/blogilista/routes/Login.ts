import { Router } from "express";
import { loginController } from "../controllers/LoginController";

const router = Router();

router.post("/", loginController.login);

export { router as loginRouter };
