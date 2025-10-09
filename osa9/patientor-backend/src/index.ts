import express from "express";
import cors from "cors";
import { diagnosesRouter } from "./routes/diagnosis";
import { patientsRouter } from "./routes/patients";
import errorHandler from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/diagnosis", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.use(errorHandler);

app.get("/api/ping", (_, res) => {
  res.json(new Date());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
