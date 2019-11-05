import React, { useState } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import "./styles/tailwind.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = () => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs));
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      setUser(user);
      setUsername("");
      setPassword("");
      fetchBlogs();
    } catch (error) {
      console.log("error", error);
    }
  };

  const loginForm = () => {
    return (
      <div className="w-full flex mt-32 ml-8">
        <div className=" max-w-md bg-gray-100 rounded overflow-hidden">
          <h1 className="text-base uppercase font-bold text-gray-700 px-8 pt-8 pb-4">
            Log in to application
          </h1>
          <form
            action=""
            className="shadow-md px-8 pb-8"
            onSubmit={handleLogin}
          >
            <div className="px-4 pb-4">
              <label
                htmlFor="username"
                className="text-sm block font-bold  pb-2"
              >
                username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                placeholder="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div className="px-4 pb-4">
              <label
                htmlFor="password"
                className="text-sm block font-bold pb-2"
              >
                password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const blogForm = () => {
    return (
      <div>
        <div className="text-sm text-gray-700 my-3">{user.name} logged in!</div>
        <h2 className="font-bold py-4 px-4 bg-gray-200 rounded overflow-hidden max-w-xs">
          Blogs
        </h2>
        {blogs &&
          blogs
            .filter(blog => blog.user.username === user.username)
            .map(blog => (
              <div>
                {blog.title} - {blog.author}
              </div>
            ))}
      </div>
    );
  };

  return (
    <div className="my-4 mx-8">
      <h1 className="text-red-700 text-4xl font-black">Blog</h1>
      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

export default App;
