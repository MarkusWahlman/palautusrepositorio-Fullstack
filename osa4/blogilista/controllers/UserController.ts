import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";

export const userController = {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
        url: 1,
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const { username, name, password } = req.body;

      if (password.length < 3) {
        res.status(400).json({ error: "Password is too short" });
        return;
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        name,
        passwordHash,
      });

      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: "User already exists" });
      } else {
        res.status(400).json({ error: "Failed to create user" });
      }
    }
  },
};
