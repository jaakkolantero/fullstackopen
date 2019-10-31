const jwt = require("jsonwebtoken");

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { withCatch } = require("../utils/withCatch");
const { parseToken } = require("../utils/parseToken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  return response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const bodyWithLikes =
    "likes" in request.body ? request.body : { ...request.body, likes: 0 };
  const bodyWithUser = { ...bodyWithLikes, user: user._id };
  const blog = new Blog(bodyWithUser);
  const [blogError, addedBlog] = await withCatch(blog.save());

  user.blogs = user.blogs.concat(addedBlog._id);
  const [userError, modifiedUser] = await withCatch(user.save());

  if (blogError) {
    response.status(400).send({ error: blogError.message });
  } else if (userError) {
    response.status(400).send({ error: userError.message });
  } else {
    response.status(201).json(addedBlog.toJSON());
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  try {
    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);

    if (user.blogs.some(blogId => blogId.toString() === blog._id.toString())) {
      const [error, removedBlog] = await withCatch(
        Blog.findByIdAndRemove(request.params.id)
      );
      if (error) {
        response.status(400).send({ error: error.message });
      } else {
        response.status(204).end();
      }
      user.blogs = user.blogs.filter(
        blog => blog._id.toString() !== removedBlog._id.toString()
      );
      const [userError, modifiedUser] = await withCatch(user.save());
    } else {
      return response.status(401).json({ error: "token missing or invalid" });
    }
  } catch (error) {
    response.status(400).json({ error: "blog or user not found" });
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
