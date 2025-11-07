import { catchAsync } from "../utils/catchAsync";
import { readingListService } from "../services/readingListService";

export const readingListController = {
  add: catchAsync(async (req, res) => {
    const { blog_id: blogId, user_id: userId } = req.body;
    if (!Number.isInteger(blogId) || !Number.isInteger(userId)) {
      res.status(400).json({ error: "blog_id and user_id must be integers" });
      return;
    }

    const entry = await readingListService.addToReadingList(userId, blogId);
    res.status(201).json(entry);
  }),

  markRead: catchAsync(async (req, res) => {
    if (!req.user) {
      throw new Error("user missing or invalid");
    }

    const userId = req.user.id;
    const blogId = Number(req.params.id);
    const { read } = req.body;

    if (!Number.isInteger(blogId)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    if (typeof read !== "boolean") {
      res.status(400).json({ error: "read must be true or false" });
      return;
    }

    const updated = await readingListService.markAsRead(userId, blogId, read);
    if (!updated) {
      res.status(404).json({ error: "reading list entry not found" });
      return;
    }

    res.json(updated);
  }),
};
