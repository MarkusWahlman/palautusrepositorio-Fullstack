import { catchAsync } from "../utils/catchAsync";
import { authorsService } from "../services/authorService";

export const authorsController = {
  getAuthors: catchAsync(async (_, res) => {
    const authors = await authorsService.getAuthorsStats();
    res.json(authors);
  }),
};
