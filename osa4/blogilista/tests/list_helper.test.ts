import assert from "node:assert";
import { describe, test } from "node:test";

import listHelper from "../utils/list_helper";
import { IBlog } from "../models/blog";

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
] as IBlog[];

const listWithMultipleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
] as IBlog[];

const listWithMultipleBlogsEqualLikes = [
  ...listWithMultipleBlogs,
  {
    _id: "2c422bc61b11a676234d17fc",
    title: "Type cars",
    author: "Mark B. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeCars.html",
    likes: 12,
  },
] as IBlog[];

describe("total likes", () => {
  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("when list has multiple blogs equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 36);
  });

  test("when list has no blogs equals the likes of that", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
});

describe("favorite blog", () => {
  test("when blog list is empty", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test("when there is only one blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test("when there are multiple blogs", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    assert.deepStrictEqual(result, listWithMultipleBlogs[2]);
  });

  test("when there are multiple blogs with equal", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogsEqualLikes);
    assert.deepStrictEqual(result, listWithMultipleBlogsEqualLikes[2]);
  });
});

describe("author with most blogs", () => {
  test("when blog list is empty", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });

  test("when there are multiple blogs", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
  });
});

describe("author with most likes", () => {
  test("when blog list is empty", () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, null);
  });

  test("when there are multiple blogs", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
