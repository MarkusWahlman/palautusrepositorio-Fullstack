import { Session } from "../models/session";

export const sessionRepository = {
  async create(token: string, userId: number) {
    return await Session.create({ token, userId });
  },

  async findByToken(token: string) {
    return await Session.findOne({ where: { token } });
  },

  async delete(token: string) {
    return await Session.destroy({ where: { token } });
  },

  async deleteAllForUser(userId: number) {
    return await Session.destroy({ where: { userId } });
  },
};
