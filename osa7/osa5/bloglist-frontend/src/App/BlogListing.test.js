import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BlogListing from "./BlogListing";

test("Opens additional info on click", () => {
  const user = {
    blogs: [],
    id: "5db990414f4f6f23a0343105",
    name: "Tero Jaakkola",
    password: "$2b$10$TNAp1IEcok6tK1p6u1RkcO0TA/0cgkWwJw0j8ogvu5zNCR9.TK9Xm",
    username: "UFo_x"
  };
  const blogs = [
    {
      author: "Tero Jaakkola",
      id: "5db9e07683e07e3c7c9e1339",
      likes: 17,
      title: "Hello world",
      url: "https://tero.jaakko.la",
      user: { ...user }
    }
  ];
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();
  const wrapper = render(
    <BlogListing
      blogs={blogs}
      loggedInUser={user}
      onUpdate={mockUpdate}
      onDelete={mockDelete}
    />
  );
  expect(wrapper.queryByTestId("bloglisting-additional")).toBeNull();
  fireEvent.click(wrapper.getByTestId("bloglisting-titleAndAuthor"));
  expect(wrapper.getByTestId("bloglisting-additional")).toBeVisible();
});
