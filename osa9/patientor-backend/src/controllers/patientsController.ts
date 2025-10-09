import type { Request, Response } from "express";
import { Patient, PatientSafe } from "../types/patient";
import {
  getAllPatientsSafe,
  createNewPatientSafe,
  getPatientById,
} from "../services/patientsService";
import { PatientInput, PatientInputSchema } from "../schemas/patients";

const patientsGetController = (_req: Request, res: Response<PatientSafe[]>) => {
  const patients = getAllPatientsSafe();
  res.json(patients);
};

const patientGetByIdController = (
  req: Request<{ id: string }>,
  res: Response<Patient | { error: string }>
) => {
  const patient = getPatientById(req.params.id);

  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
    return;
  }

  res.json({ ...patient, entries: patient.entries ?? [] });
};

const patientsPostController = (
  req: Request<unknown, unknown, PatientInput>,
  res: Response<PatientSafe>
) => {
  const patientInput = PatientInputSchema.parse(req.body);

  const newPatient = createNewPatientSafe(patientInput);
  res.json(newPatient);
};

export {
  patientsGetController,
  patientGetByIdController,
  patientsPostController,
};
