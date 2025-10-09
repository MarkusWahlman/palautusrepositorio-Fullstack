import data from "../data/diagnosis";
import { Diagnosis } from "../types/diagnosis";

const getAllDiagnosis = (): Diagnosis[] => {
  return data;
};

export { getAllDiagnosis };
