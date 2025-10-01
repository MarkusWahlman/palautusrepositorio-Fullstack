import jsonServer from "json-server";
import type { Request, Response, NextFunction } from "express";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const validator = (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body as { content?: string };

  if (req.method === "POST" && (!content || content.length < 5)) {
    return res.status(400).json({
      error: "too short anecdote, must have length 5 or more",
    });
  } else {
    next();
  }
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(validator);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
