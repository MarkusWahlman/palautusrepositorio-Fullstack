import "dotenv/config";

import express from "express";
import { blogsRouter } from "./routes/blogsRoute";

import errorHandler from "./middlewares/errorHandler";
import { usersRouter } from "./routes/usersRoute";
import { loginRouter } from "./routes/loginRoute";
import { authorsRouter } from "./routes/authorsRoute";
import { connectToDatabase } from "./utils/db";
import { readingListRouter } from "./routes/readingList";
import { logoutRouter } from "./routes/logoutRoute";

const app = express();

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglist", readingListRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectToDatabase();

    console.log("Connected to the database.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

start();
