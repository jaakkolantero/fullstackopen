const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { withCatch } = require("../utils/withCatch");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  return response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const bodyWithLikes =
    "likes" in request.body ? request.body : { ...request.body, likes: 0 };
  const bodyWithUser = { ...bodyWithLikes, user: "5db990414f4f6f23a0343105" };
  const blog = new Blog(bodyWithUser);

  const [error, addedBlog] = await withCatch(blog.save());
  if (error) {
    response.status(400).send({ error: error.message });
  } else {
    response.status(201).json(addedBlog.toJSON());
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const [error, removedBlog] = await withCatch(
    Blog.findByIdAndRemove(request.params.id)
  );
  if (error) {
    response.status(400).send({ error: error.message });
  } else {
    response.status(204).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;

  const [error, editedBlog] = await withCatch(
    Blog.findByIdAndUpdate(id, { ...request.body }, { new: true })
  );
  if (error) {
    response.status(400).send({ error: error.message });
  } else {
    response.json(editedBlog.toJSON());
  }
});

module.exports = blogsRouter;
