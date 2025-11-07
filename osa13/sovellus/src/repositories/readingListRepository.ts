import { ReadingList } from "../models/readingList";

export const readingListRepository = {
  async add(userId: number, blogId: number) {
    return await ReadingList.create({ userId: userId, blogId: blogId });
  },

  async markRead(userId: number, blogId: number, read: boolean) {
    const entry = await ReadingList.findOne({
      where: { userId, blogId },
    });

    if (!entry) return null;

    entry.read = read;
    await entry.save();
    return entry;
  },
};
