import test, { beforeEach, describe } from "node:test";
import { Blog, IBlog } from "../models/blog";
import supertest from "supertest";
import { app } from "..";
import assert from "node:assert";

const api = supertest(app);

const initialBlogList = [
  {
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
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
] as IBlog[];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blogData of initialBlogList) {
    const blog = new Blog(blogData);
    await blog.save();
  }
});

describe("blog api", () => {
  test("returns all blogs", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, initialBlogList.length);
  });

  test("returns an id", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });

  test("accepts new blogs", async () => {
    const newBlog = {
      title: "How to Fix Virtual Machines",
      author: "Tamas Baka",
      url: "https://randomblog.hu/",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(201);
    const response = await api.get("/api/blogs");
    assert.strictEqual(initialBlogList.length + 1, response.body.length);
  });

  test("likes default to zero", async () => {
    const newBlog = {
      title: "Random Finnish Lesson",
      author: "Hanna Männikkölahti",
      url: "https://randomfinnishlesson.blogspot.com/",
    };

    const response = await api.post("/api/blogs").send(newBlog).expect(201);
    const newBlogBody = response.body;

    assert.strictEqual(newBlogBody.likes, 0);
  });

  test("fails for empty title", async () => {
    const newBlog = {
      author: "Hanna Männikkölahti",
      url: "https://randomfinnishlesson.blogspot.com/",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("fails for empty url", async () => {
    const newBlog = {
      title: "Random Finnish Lesson",
      author: "Hanna Männikkölahti",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("delete single blog", async () => {
    const getResponse = await api.get("/api/blogs");
    const blogs = getResponse.body;

    const deleteBlogId = blogs[0].id;
    await api.delete(`/api/blogs/${deleteBlogId}`);

    const afterDeleteResponse = await api.get("/api/blogs");
    const blogsAfterDelete = afterDeleteResponse.body;
    const deletedExists = blogsAfterDelete.some(
      (b: any) => b.id === deleteBlogId
    );
    assert.strictEqual(blogsAfterDelete.length + 1, blogs.length);
    assert.deepEqual(deletedExists, false);
  });

  test("modify single blog", async () => {
    const getResponse = await api.get("/api/blogs");
    const blogs = getResponse.body;

    const newContent = { likes: 5, title: "New Title Test" };
    const modifyBlog = blogs[0];
    await api.patch(`/api/blogs/${modifyBlog.id}`).send(newContent).expect(200);

    const afterModifyResponse = await api.get("/api/blogs");
    const blogsAfterModify = afterModifyResponse.body;

    const modifiedBlog = blogsAfterModify.find(
      (b: any) => b.id === modifyBlog.id
    );

    assert.strictEqual(modifiedBlog.likes, newContent.likes);
    assert.strictEqual(modifiedBlog.title, newContent.title);
  });
});
