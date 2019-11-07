import React from "react";
import { render, waitForElement } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  test("if no user logged, blogs are not rendered", async () => {
    const wrapper = render(<App />);
    wrapper.rerender(<App />);

    await waitForElement(() => wrapper.getByTestId("app-container"));

    expect(wrapper.getByTestId("loginform-container")).toBeVisible();
    expect(wrapper.queryByTestId("blogform-container")).toBeNull();
  });
});
