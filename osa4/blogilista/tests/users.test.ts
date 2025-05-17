import test, { after, beforeEach, describe } from "node:test";
import supertest from "supertest";
import assert from "node:assert";
import mongoose from "mongoose";
import { app } from "../app";
import { IUser, User } from "../models/user";

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

describe("users api", () => {
  test("fails to create user with too short password", async () => {
    const newUser = {
      username: "Make",
      name: "Markus",
      password: "sa",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    assert.match(response.text, /Password is too short/);
  });

  test("fails to create duplicate user ", async () => {
    const newUser = {
      username: "Make",
      name: "Markus",
      password: "GoodPassword123",
    };

    await api.post("/api/users").send(newUser).expect(201);
    const response = await api.post("/api/users").send(newUser).expect(400);
    assert.match(response.text, /User already exists/);
  });
});

after(async () => {
  await mongoose.connection.close();
});
