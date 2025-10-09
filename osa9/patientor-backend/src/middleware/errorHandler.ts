import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError || err.name === "ZodError") {
    res.status(400).json({
      status: 400,
      message: "Validation error",
    });
    return;
  }
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).send({ status: 400, message: "Malformed JSON" });
    return;
  }

  res.status(500).json({ error: "Internal Server Error" });
  return;
}

export default errorHandler;
