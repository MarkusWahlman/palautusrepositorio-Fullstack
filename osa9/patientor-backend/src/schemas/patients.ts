import { z } from "zod";
import { Gender } from "../types/patient";

export const PatientInputSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  dateOfBirth: z.string().min(1).max(50),
  ssn: z.string().min(1, "SSN is required").max(50),
  gender: z.enum(Gender),
  occupation: z.string().min(1, "Occupation is required").max(50),
});

export type PatientInput = z.infer<typeof PatientInputSchema>;
