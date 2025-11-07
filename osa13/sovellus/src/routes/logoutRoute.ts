import express from "express";
import { logoutController } from "../controllers/logoutController";
import { tokenExtractor } from "../middlewares/tokenExtractor";

const router = express.Router();

router.delete("/", tokenExtractor, logoutController.logout);

export { router as logoutRouter };
