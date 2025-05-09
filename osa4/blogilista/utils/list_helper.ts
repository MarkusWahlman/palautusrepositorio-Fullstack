import { IBlog } from "../models/blog";
import _ from "lodash";

const dummy = (_: never[]) => {
  return 1;
};

const totalLikes = (blogs: IBlog[]) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs: IBlog[]) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((prev, current) =>
    current.likes > prev.likes ? current : prev
  );
};

const mostBlogs = (blogs: IBlog[]) => {
  if (blogs.length === 0) return null;

  const authorCounts = _.countBy(blogs, "author");
  const [author, count] = _.maxBy(
    Object.entries(authorCounts),
    ([, cnt]) => cnt
  )!;

  return { author, blogs: count };
};

const mostLikes = (blogs: IBlog[]) => {
  if (blogs.length === 0) return null;

  const grouped = _.groupBy(blogs, "author");
  const likesByAuthor = _.mapValues(grouped, (blogs) =>
    _.sumBy(blogs, "likes")
  );
  const [author, likes] = _.maxBy(
    Object.entries(likesByAuthor),
    ([, totalLikes]) => totalLikes
  )!;

  return { author, likes };
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
