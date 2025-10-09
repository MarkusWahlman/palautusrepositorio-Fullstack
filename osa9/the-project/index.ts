import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
const port = "3003";

app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(heightNum, weightNum);

  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi,
  });
});

interface ExerciseRequestBody {
  daily_exercises: number[];
  target: number;
}

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseRequestBody;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    daily_exercises.some((d) => isNaN(Number(d)))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(
    daily_exercises.map(Number),
    Number(target)
  );
  return res.json(result);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
