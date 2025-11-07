import express from "express";
import { readingListController } from "../controllers/readingListController";
import { tokenExtractor } from "../middlewares/tokenExtractor";

export const readingListRouter = express.Router();

readingListRouter.post("/", readingListController.add);
readingListRouter.put("/:id", tokenExtractor, readingListController.markRead);
