import { Router } from "express";
import { diagnosisGetController } from "../controllers/diagnosisController";

const router = Router();

router.get("/", diagnosisGetController);

export { router as diagnosesRouter };
