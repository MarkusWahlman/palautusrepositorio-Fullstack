import { Blog } from "../models/blog";
import { ReadingList } from "../models/readingList";
import { User } from "../models/user";

export const userRepository = {
  async findAll() {
    return await User.findAll({
      include: {
        model: Blog,
      },
    });
  },

  async create(data: { name: string; username: string }) {
    return await User.create(data);
  },

  async findByUsername(username: string) {
    return await User.findOne({
      where: { username },
      include: {
        model: Blog,
      },
    });
  },

  async findById(id: number, read?: boolean) {
    return await User.findByPk(id, {
      attributes: ["id", "name", "username"],
      include: [
        {
          model: Blog,
        },
        {
          model: ReadingList,
          as: "readings",
          attributes: ["read"],
          where: read !== undefined ? { read } : {},
          required: false,
          include: [
            {
              model: Blog,
              as: "blog",
              attributes: [
                "id",
                "author",
                "url",
                "title",
                "likes",
                "year",
                "userId",
              ],
            },
          ],
        },
      ],
    });
  },

  async updateName(username: string, name: string) {
    const user = await User.findOne({ where: { username } });
    if (!user) return null;

    user.name = name;
    await user.save();
    return user;
  },
};
