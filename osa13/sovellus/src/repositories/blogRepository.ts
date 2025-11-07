import { Op } from "sequelize";
import { Blog } from "../models/blog";
import { User } from "../models/user";

export const blogRepository = {
  async findAll(search?: string) {
    const where = search
      ? {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { author: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    return await Blog.findAll({
      where,
      order: [["likes", "DESC"]],
    });
  },

  async findById(id: number) {
    return await Blog.findByPk(id, {
      include: {
        model: User,
        attributes: ["id", "name", "username"],
      },
    });
  },

  async create(data: {
    author?: string;
    url: string;
    title: string;
    likes?: number;
    userId: number;
  }) {
    return await Blog.create(data);
  },

  async delete(id: number) {
    return await Blog.destroy({ where: { id } });
  },

  async updateLikes(id: number, likes: number) {
    const blog = await Blog.findByPk(id);
    if (!blog) return null;

    blog.likes = likes;
    await blog.save();

    return blog;
  },
};
