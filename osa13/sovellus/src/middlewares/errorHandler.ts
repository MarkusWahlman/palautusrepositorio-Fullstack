import type { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";

function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);

  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: "Internal Server Error" });
}

export default errorHandler;
