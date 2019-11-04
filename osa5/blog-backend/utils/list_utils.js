const lodash = require("lodash");

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce(function(total, blog) {
    return total + blog.likes;
  }, 0);
};

const favoriteBlog = blogs => {
  const maxLikes = Math.max.apply(Math, blogs.map(blog => blog.likes));
  return blogs.filter(blog => blog.likes === maxLikes);
};

const mostBlogs = blogs => {
  const authorWithMostBlogs = lodash.countBy(blogs, "author");
  if (
    lodash.keys(authorWithMostBlogs)[0] &&
    lodash.values(authorWithMostBlogs)[0]
  ) {
    return {
      author: lodash.keys(authorWithMostBlogs)[0],
      blogs: lodash.values(authorWithMostBlogs)[0]
    };
  }

  return undefined;
};

const mostLikes = blogs => {
  return lodash(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: lodash.sumBy(objs, "likes")
    }))
    .value()[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
