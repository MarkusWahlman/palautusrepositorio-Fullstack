import { Request, Response } from "express";

import { User } from "../models/user";
import { Blog } from "../models/blog";

export const testingController = {
  async resetDatabase(req: Request, res: Response) {
    try {
      await User.deleteMany({});
      await Blog.deleteMany({});

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to reset database" });
    }
  },
};
