const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const User = require("../models/user");
const { initialUsers, usersInDb } = require("./test_helper");

beforeEach(async () => {
  await User.deleteMany({});

  let userObject = new User(initialUsers[0]);
  await userObject.save();

  userObject = new User(initialUsers[1]);
  await userObject.save();
});

test("amount of users does not increment", async () => {
  const newUser = {
    name: "Tero",
    username: "tw",
    password: "sekasdf"
  };
  await api
    .post("/api/users")
    .send(newUser)
    .set("Accept", "application/json")
    .expect(400);
  const newUsers = await usersInDb();
  expect(newUsers.length).toBe(initialUsers.length);
});

afterAll(() => {
  mongoose.connection.close();
});
