import { Request, Response } from "express";

export const userController = {
  async createUser(req: Request, res: Response) {
    try {
      res.status(201).json();
    } catch (error) {
      res.status(400).json({ error: "Failed to create user" });
    }
  },
};
