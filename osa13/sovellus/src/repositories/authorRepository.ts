import { Blog } from "../models/blog";
import { fn, col, literal, Op } from "sequelize";

export const authorRepository = {
  async getAuthorsStats() {
    return await Blog.findAll({
      attributes: [
        "author",
        [fn("COUNT", col("id")), "blogs"],
        [fn("SUM", col("likes")), "likes"],
      ],
      where: {
        author: {
          [Op.not]: null,
        },
      },
      group: ["author"],
      order: [[literal("likes"), "DESC"]],
    });
  },
};
