import { Router } from "express";
import { authorsController } from "../controllers/authorController";

const router = Router();

router.get("/", authorsController.getAuthors);

export { router as authorsRouter };
