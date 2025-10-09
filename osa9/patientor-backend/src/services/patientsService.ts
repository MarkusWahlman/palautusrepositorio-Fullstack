import data from "../data/patients";
import { PatientInput } from "../schemas/patients";
import { Patient, PatientSafe } from "../types/patient";
import { v1 as uuid } from "uuid";

const getAllPatientsSafe = (): PatientSafe[] => {
  return data.map(
    ({ ssn: _ssn, entries: _entries, ...safePatient }) => safePatient
  );
};

const createNewPatientSafe = (patientInput: PatientInput): PatientSafe => {
  const newPatient = { ...patientInput, id: uuid(), entries: [] };
  data.concat(newPatient);
  return newPatient;
};

export const getPatientById = (id: string): Patient | undefined => {
  return data.find((p) => p.id === id);
};

export { getAllPatientsSafe, createNewPatientSafe };
