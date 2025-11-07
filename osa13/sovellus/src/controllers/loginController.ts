import { catchAsync } from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import { userService } from "../services/userService";
import { sessionService } from "../services/sessionService";

const HARDCODED_PASSWORD = "secret";

export const loginController = {
  login: catchAsync(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "username and password required" });
      return;
    }

    const user = await userService.getUserByUsername(username);

    if (!user || password !== HARDCODED_PASSWORD) {
      res.status(401).json({ error: "invalid username or password" });
      return;
    }

    if (user.disabled) {
      res.status(403).json({ error: "user disabled" });
      return;
    }

    const userForToken = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET!);

    await sessionService.createSession(token, user.id);

    res.json({
      token,
      username: user.username,
      name: user.name,
    });
  }),
};
