const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const { withCatch } = require("../utils/withCatch");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  return response.json(users.map(user => user.toJSON()));
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const saltRounds = 10;
  const [hashError, passwordHash] = await withCatch(
    bcrypt.hash(password, saltRounds)
  );

  const user = new User({
    username,
    name,
    password: passwordHash
  });

  const [saveUserError, savedUser] = await withCatch(user.save());

  if (saveUserError) {
    response.status(400).send({ error: saveUserError.message });
  } else {
    response.json(savedUser.toJSON());
  }
});

module.exports = usersRouter;
