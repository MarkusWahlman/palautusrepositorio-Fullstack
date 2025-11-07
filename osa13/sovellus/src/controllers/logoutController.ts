import { catchAsync } from "../utils/catchAsync";
import { sessionService } from "../services/sessionService";
import { tokenExtractor } from "../middlewares/tokenExtractor";

export const logoutController = {
  logout: catchAsync(async (req: any, res) => {
    await sessionService.deleteSession(req.token);
    res.status(204).end();
  }),
};
