import jwt from "jsonwebtoken";
import { SECRET } from "../utils/config";

const tokenExtractor = (req, res, next) => {
  let authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    authorization = authorization.replace("Bearer ", "");
  }

  try {
    const decodedToken = jwt.verify(authorization, SECRET);
    req.user = decodedToken;
  } catch (e) {
    res.status(401).json({ error: "No access" });
    return;
  }

  next();
};

export { tokenExtractor };
