const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Hello world",
    author: "Tero Jaakkola",
    url: "tero.jaakko.la",
    likes: 0,
    id: "5db5e743f7f98f0ecc2ee7df",
    user: {
      username: "test1234",
      name: "Kim Dotcom",
      id: "5db990414f4f6f23a0343105"
    }
  },
  {
    title: "Hello world2",
    author: "Tero Jaakkola",
    url: "tero.jaakko.la",
    likes: 2,
    id: "5db5f13bed5ab314788b507c",
    user: {
      username: "test12345678",
      name: "Kim Dotcom",
      id: "5db9d898fccdf936047098e1"
    }
  }
];

const initialUsers = [
  {
    username: "UFo_x",
    name: "Tero Jaakkola",
    password: "$2b$10$TNAp1IEcok6tK1p6u1RkcO0TA/0cgkWwJw0j8ogvu5zNCR9.TK9Xm",
    id: "5db990414f4f6f23a0343105"
  },
  {
    username: "UFo_x1234",
    name: "Tero Jaakkola",
    password: "$2b$10$3UNiU3ExjzTCa8ong3toUOSzn/VIDSRMdO.TZFkak.hBApr.egyZW",
    id: "5db9d898fccdf936047098e1"
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  initialUsers
};
