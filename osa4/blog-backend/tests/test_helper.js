const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Hello world",
    author: "Tero Jaakkola",
    url: "tero.jaakko.la",
    likes: 0,
    id: "5db5e743f7f98f0ecc2ee7df"
  },
  {
    title: "Hello world2",
    author: "Tero Jaakkola",
    url: "tero.jaakko.la",
    likes: 2,
    id: "5db5f13bed5ab314788b507c"
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb
};
