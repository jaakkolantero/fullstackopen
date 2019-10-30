const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

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

afterAll(() => {
  mongoose.connection.close();
});
