import { userRepository } from "../repositories/userRepository";

export const userService = {
  async getAllUsers() {
    return await userRepository.findAll();
  },

  async getUserByUsername(username: string) {
    return await userRepository.findByUsername(username);
  },

  async getUserById(id: number, read?: boolean) {
    return await userRepository.findById(id, read);
  },
  async createUser(data: { name: string; username: string }) {
    return await userRepository.create(data);
  },

  async updateUserName(username: string, newName: string) {
    const updatedUser = await userRepository.updateName(username, newName);
    return updatedUser;
  },
};
