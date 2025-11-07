import { sessionRepository } from "../repositories/sessionRepository";

export const sessionService = {
  async createSession(token: string, userId: number) {
    return await sessionRepository.create(token, userId);
  },

  async isValid(token: string) {
    return await sessionRepository.findByToken(token);
  },

  async deleteSession(token: string) {
    return await sessionRepository.delete(token);
  },

  // Jos tehtävässä oli ideana poistaa kaikki käyttäjän tokenit se onnistuu tällä
  async deleteAllUserSessions(userId: number) {
    return await sessionRepository.deleteAllForUser(userId);
  },
};
