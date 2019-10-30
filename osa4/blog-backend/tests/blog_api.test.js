const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

describe("GET /api/blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("id not _id", async () => {
    const { body } = await api.get("/api/blogs");
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).not.toHaveProperty("_id");
  });
});

describe("POST /api/blogs", () => {
  test("amount of blogs increments", async () => {
    const newBlog = {
      title: "Hello world3",
      author: "Tero Jaakkola",
      url: "tero.jaakko.la",
      likes: 5
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
    const newBlogs = await blogsInDb();
    expect(newBlogs.length).toBe(initialBlogs.length + 1);
  });
  test("blog added correctly", async () => {
    const newBlog = {
      title: "Hello world3",
      author: "Tero Jaakkola",
      url: "tero.jaakko.la",
      likes: 5
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
    const newBlogs = await blogsInDb();
    expect(newBlogs[newBlogs.length - 1]).toMatchObject(newBlog);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
