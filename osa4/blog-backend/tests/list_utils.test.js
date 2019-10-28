const listUtils = require("../utils/list_utils");

test("dummy returns one", () => {
  const blogs = [];

  const result = listUtils.dummy(blogs);
  expect(result).toBe(1);
});
