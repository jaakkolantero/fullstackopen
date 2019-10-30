const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const bodyWithLikes =
    "likes" in request.body ? request.body : { ...request.body, likes: 0 };
  const blog = new Blog(bodyWithLikes);

  const addedBlog = await blog.save();
  response.status(201).json(addedBlog);
});

module.exports = blogsRouter;
