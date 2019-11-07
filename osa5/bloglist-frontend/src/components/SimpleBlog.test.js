import React from "react";
import { render } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

test("renders title author and number of likes", () => {
  const blog = { title: "this is title", author: "Tero Jaakkola", likes: 5 };
  const wrapper = render(<SimpleBlog blog={blog} />);

  wrapper.debug();

  expect(
    wrapper.getByTestId("simpleblog-titleAndAuthor").textContent
  ).toContain(blog.title);
  expect(
    wrapper.getByTestId("simpleblog-titleAndAuthor").textContent
  ).toContain(blog.author);
  expect(wrapper.getByTestId("simpleblog-likes").textContent).toContain(
    blog.likes
  );
});
