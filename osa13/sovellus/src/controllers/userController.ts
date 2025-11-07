import { catchAsync } from "../utils/catchAsync";
import { userService } from "../services/userService";

export const usersController = {
  getAll: catchAsync(async (_, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
  }),

  getById: catchAsync(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid id parameter" });
      return;
    }

    const readFilter = req.query.read;
    let read: boolean | undefined;
    if (readFilter === "true") read = true;
    else if (readFilter === "false") read = false;

    const user = await userService.getUserById(id, read);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  }),

  create: catchAsync(async (req, res) => {
    const { name, username } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !username ||
      typeof username !== "string" ||
      username.length < 3 ||
      name.length < 3
    ) {
      res.status(400).json({
        error:
          "name and username are required and must be strings over 3 characters",
      });
      return;
    }

    try {
      const newUser = await userService.createUser({ name, username });
      res.status(201).json(newUser);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }),

  updateName: catchAsync(async (req, res) => {
    const username = req.params.username;
    const { name } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !username ||
      typeof username !== "string" ||
      username.length < 3 ||
      name.length < 3
    ) {
      res.status(400).json({
        error:
          "name and username are required and must be strings over 3 characters",
      });
      return;
    }

    const updatedUser = await userService.updateUserName(username, name);

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(updatedUser);
  }),
};
