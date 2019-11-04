const parseToken = authorization => {
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

module.exports = { parseToken };
