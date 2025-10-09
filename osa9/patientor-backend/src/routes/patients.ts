import { Router } from "express";
import {
  patientGetByIdController,
  patientsGetController,
  patientsPostController,
} from "../controllers/patientsController";

const router = Router();

router.get("/", patientsGetController);
router.get("/:id", patientGetByIdController);
router.post("/", patientsPostController);

export { router as patientsRouter };
