const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { withCatch } = require("../utils/withCatch");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const bodyWithLikes =
    "likes" in request.body ? request.body : { ...request.body, likes: 0 };
  const blog = new Blog(bodyWithLikes);

  const [error, addedBlog] = await withCatch(blog.save());
  if (error) {
    response.status(400).send({ error: error.message });
  } else {
    response.status(201).json(addedBlog.toJSON());
  }
});

module.exports = blogsRouter;
