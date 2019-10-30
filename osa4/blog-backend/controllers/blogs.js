const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const addedBlog = await blog.save();
  response.status(201).json(addedBlog);
});

module.exports = blogsRouter;
