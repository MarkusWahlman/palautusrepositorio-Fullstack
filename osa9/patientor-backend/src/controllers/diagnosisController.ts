import type { Request, Response } from "express";
import { Diagnosis } from "../types/diagnosis";
import { getAllDiagnosis } from "../services/diagnosisService";

const diagnosisGetController = (_req: Request, res: Response<Diagnosis[]>) => {
  const diagnosis = getAllDiagnosis();
  res.json(diagnosis);
};

export { diagnosisGetController };
