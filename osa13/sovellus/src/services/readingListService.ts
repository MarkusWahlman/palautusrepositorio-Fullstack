import { readingListRepository } from "../repositories/readingListRepository";

export const readingListService = {
  async addToReadingList(userId: number, blogId: number) {
    return await readingListRepository.add(userId, blogId);
  },

  async markAsRead(userId: number, blogId: number, read: boolean) {
    return await readingListRepository.markRead(userId, blogId, read);
  },
};
