import { authorRepository } from "../repositories/authorRepository";

export const authorsService = {
  async getAuthorsStats() {
    return await authorRepository.getAuthorsStats();
  },
};
