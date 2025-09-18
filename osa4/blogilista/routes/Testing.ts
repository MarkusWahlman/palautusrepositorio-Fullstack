import { Router } from "express";
import { testingController } from "../controllers/TestingController";

const router = Router();

router.post("/reset", testingController.resetDatabase);

export { router as testingRouter };
