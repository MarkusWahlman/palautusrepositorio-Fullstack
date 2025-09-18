import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/config";

export const loginController = {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        res.status(401).json({
          error: "Invalid username or password",
        });
        return;
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, SECRET);

      res
        .status(200)
        .send({ token, username: user.username, name: user.name, id: user.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to login" });
    }
  },
};
