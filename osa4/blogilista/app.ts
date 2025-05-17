import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { apiRouter } from "./routes/Api";
import { MONGODB_URI, PORT } from "./utils/config";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRouter);

export { app };
