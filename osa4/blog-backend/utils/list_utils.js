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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
