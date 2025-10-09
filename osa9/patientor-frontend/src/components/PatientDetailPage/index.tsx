import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Patient, Entry } from "../../types";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!id) return;
        const data = await patientService.getById(id);
        setPatient(data);
      } catch (err) {
        setError("Failed to fetch patient data.");
      }
    };
    void fetchPatient();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!patient) return <p>Loading...</p>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>
      <p>SSN: {patient.ssn}</p>

      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        <ul>
          {patient.entries.map((entry: Entry) => (
            <li key={entry.id}>
              <p>
                <strong>{entry.date}</strong> - {entry.description}
              </p>
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDetailPage;
