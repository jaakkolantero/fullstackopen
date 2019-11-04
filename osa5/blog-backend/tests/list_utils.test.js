const listUtils = require("../utils/list_utils");

test("dummy returns one", () => {
  const blogs = [];

  const result = listUtils.dummy(blogs);
  expect(result).toBe(1);
});

const listWithOneBlog = [
  {
    title: "Hello world",
    author: "Tero Jaakkola",
    url: "tero.jaakko.la",
    likes: 1,
    id: "5db5e743f7f98f0ecc2ee7df"
  }
];
const listWithMultipleBlogs = [
  {
    title: "Hello world",
    author: "Tero Jaakkola",
    url: "tero.jaakko.la",
    likes: 2,
    id: "5db5e743f7f98f0ecc2ee7df"
  },
  {
    title: "Hello world2",
    author: "Tero Jaakkola",
    url: "tero.jaakko.la",
    likes: 5,
    id: "5db5f13bed5ab314788b507c"
  },
  {
    title: "Hello world3",
    author: "Dan Abramov",
    url: "tero.jaakko.la",
    likes: 5,
    id: "5db69eef47740844f87bec37"
  }
];

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listUtils.totalLikes([]);
    expect(result).toBe(0);
  });
  test("when list has only one blog equals the likes of that", () => {
    const result = listUtils.totalLikes(listWithOneBlog);
    expect(result).toBe(1);
  });
  test("sums multiple blog likes correctly", () => {
    const result = listUtils.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(12);
  });
});

describe("favorite blog", () => {
  const listWithOneFavoriteBlog = [
    {
      title: "Hello world",
      author: "Tero Jaakkola",
      url: "tero.jaakko.la",
      likes: 2,
      id: "5db5e743f7f98f0ecc2ee7df"
    },
    {
      title: "Hello world2",
      author: "Tero Jaakkola",
      url: "tero.jaakko.la",
      likes: 5,
      id: "5db5f13bed5ab314788b507c"
    },
    {
      title: "Hello world3",
      author: "Tero Jaakkola",
      url: "tero.jaakko.la",
      likes: 4,
      id: "5db69eef47740844f87bec37"
    }
  ];
  test("of empty list is zero", () => {
    const result = listUtils.favoriteBlog([]);
    expect(result).toStrictEqual([]);
  });
  test("when list has only one blog, favorite equals the likes of that", () => {
    const result = listUtils.favoriteBlog(listWithOneBlog);
    expect(result).toStrictEqual(listWithOneBlog);
  });
  test("return multiple favorite blogs correctly", () => {
    const result = listUtils.favoriteBlog(listWithMultipleBlogs);
    expect(result).toStrictEqual([
      listWithMultipleBlogs[1],
      listWithMultipleBlogs[2]
    ]);
  });
  test("return one favorite blog correctly", () => {
    const result = listUtils.favoriteBlog(listWithOneFavoriteBlog);
    expect(result).toStrictEqual([listWithOneFavoriteBlog[1]]);
  });
});

describe("most blogs", () => {
  const listWithMultipleMostBlogs = [
    {
      title: "Hello world",
      author: "Tero Jaakkola",
      url: "tero.jaakko.la",
      likes: 2,
      id: "5db5e743f7f98f0ecc2ee7df"
    },
    {
      title: "Hello world2",
      author: "Tero Jaakkola",
      url: "tero.jaakko.la",
      likes: 5,
      id: "5db5f13bed5ab314788b507c"
    },
    {
      title: "Hello world3",
      author: "Dan Abramov",
      url: "tero.jaakko.la",
      likes: 5,
      id: "5db69eef47740844f87bec37"
    },
    {
      title: "Hello world3",
      author: "Dan Abramov",
      url: "tero.jaakko.la",
      likes: 5,
      id: "5db69eef47740844f87bec37"
    }
  ];

  test("of empty list is undefined", () => {
    const result = listUtils.mostBlogs([]);
    expect(result).toStrictEqual(undefined);
  });
  test("when list has only one blog, equals the author of that", () => {
    const result = listUtils.mostBlogs(listWithOneBlog);
    expect(result).toStrictEqual({ author: "Tero Jaakkola", blogs: 1 });
  });
  test("return first one to get most blogs correctly", () => {
    const result = listUtils.mostBlogs(listWithMultipleMostBlogs);
    expect(result).toStrictEqual({ author: "Tero Jaakkola", blogs: 2 });
  });
  test("return one favorite blog correctly", () => {
    const result = listUtils.mostBlogs(listWithMultipleBlogs);
    expect(result).toStrictEqual({ author: "Tero Jaakkola", blogs: 2 });
  });
});

describe("most likes", () => {
  const listWithMultipleMostLikes = [
    {
      title: "Hello world",
      author: "Tero Jaakkola",
      url: "tero.jaakko.la",
      likes: 5,
      id: "5db5e743f7f98f0ecc2ee7df"
    },
    {
      title: "Hello world2",
      author: "Tero Jaakkola",
      url: "tero.jaakko.la",
      likes: 5,
      id: "5db5f13bed5ab314788b507c"
    },
    {
      title: "Hello world3",
      author: "Dan Abramov",
      url: "tero.jaakko.la",
      likes: 5,
      id: "5db69eef47740844f87bec37"
    },
    {
      title: "Hello world3",
      author: "Dan Abramov",
      url: "tero.jaakko.la",
      likes: 5,
      id: "5db69eef47740844f87bec37"
    }
  ];

  test("of empty list is undefined", () => {
    const result = listUtils.mostLikes([]);
    expect(result).toStrictEqual(undefined);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const result = listUtils.mostLikes(listWithOneBlog);
    expect(result).toStrictEqual({ author: "Tero Jaakkola", likes: 1 });
  });
  test("return first one to get most likes", () => {
    const result = listUtils.mostLikes(listWithMultipleMostLikes);
    expect(result).toStrictEqual({ author: "Tero Jaakkola", likes: 10 });
  });
  test("return most likes", () => {
    const result = listUtils.mostLikes(listWithMultipleBlogs);
    expect(result).toStrictEqual({ author: "Tero Jaakkola", likes: 7 });
  });
});
