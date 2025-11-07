import jwt from "jsonwebtoken";
import { sessionService } from "../services/sessionService";
import { userService } from "../services/userService";
import { catchAsync } from "../utils/catchAsync";

interface TokenPayload extends jwt.JwtPayload {
  id: number;
}

export const tokenExtractor = catchAsync(async (req, res, next) => {
  const auth = req.get("authorization");

  if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
    res.status(401).json({ error: "token missing" });
    return;
  }

  const token = auth.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

  const session = await sessionService.isValid(token);
  if (!session) {
    res.status(401).json({ error: "session expired" });
    return;
  }

  const user = await userService.getUserById(decoded.id);
  if (!user || user.disabled) {
    res.status(403).json({ error: "user disabled" });
    return;
  }

  req.user = user;
  req.token = token;
  next();
});
