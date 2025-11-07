import { blogRepository } from "../repositories/blogRepository";

export const blogService = {
  async getAllBlogs(search?: string) {
    return await blogRepository.findAll(search);
  },

  async getBlogById(id: number) {
    const blog = await blogRepository.findById(id);
    return blog;
  },

  async createBlog(data: {
    author?: string;
    url: string;
    title: string;
    likes?: number;
    year?: number;
    userId: number;
  }) {
    return await blogRepository.create(data);
  },

  async deleteBlog(id: number) {
    return await blogRepository.delete(id);
  },

  async updateBlogLikes(id: number, likes: number) {
    const updatedBlog = await blogRepository.updateLikes(id, likes);
    return updatedBlog;
  },
};
