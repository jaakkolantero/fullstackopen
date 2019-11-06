import React, { useState, useEffect } from "react";
import Notifications, { notify } from "react-notify-toast";
import loginService from "./services/login";
import blogService from "./services/blogs";
import "./styles/tailwind.css";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Toggle from "./App/Toggle";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useLocalStorage("user", null);

  useEffect(() => {
    if (user) {
      console.log("user", user);
      fetchBlogs();
    }
  }, [user]);

  useEffect(() => {
    console.log("blogs", blogs);
  }, [blogs]);

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
      notify.show("wrong username or password", "error", 3000);
      console.log("error", error);
    }
  };

  const handleAddBlog = event => {
    event.preventDefault();
    if (!(title && author && url)) {
      notify.show("error! title author or url missing.", "error", 3000);
      console.log("error! title author or url missing.");
      return;
    }
    try {
      blogService.create({ title, author, url }, user.token).then(newBlog => {
        //TODO: update excisting blogs instead of refetch
        notify.show("Blog added!", "success", 3000);
        fetchBlogs();
      });
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      notify.show("Error Creating blog", "error", 3000);
      console.log("error creating blog", error);
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
        <div className="text-sm text-gray-700 my-3">
          {user.name} logged in!
          <button
            onClick={() => setUser(null)}
            className="inline-block ml-3 rounded-sm px-2 py-1 overflow-hidden bg-red-200 hover:bg-red-500 border border-gray-700"
          >
            Log out
          </button>
        </div>
        <Toggle showText="Create blog ▼" hideText="Hide ▲">
          <div className="my-3">{addBlogForm()}</div>
        </Toggle>
        <h2 className="font-bold py-4 px-4 bg-gray-200 rounded overflow-hidden max-w-xs">
          Blogs
        </h2>
        {blogs
          .filter(blog => blog.user.username === user.username)
          .map(blog => (
            <div key={blog.id}>
              {blog.title} - {blog.author}
            </div>
          ))}
      </div>
    );
  };

  const addBlogForm = () => {
    return (
      <div className=" max-w-md bg-gray-100 rounded overflow-hidden">
        <h1 className="text-base uppercase font-bold text-gray-700 px-4 pt-4 pb-2">
          Create Blog
        </h1>
        <form
          action=""
          className="shadow-md px-8 pb-8"
          onSubmit={handleAddBlog}
        >
          <div className="px-4 pb-4">
            <label htmlFor="title" className="text-sm block font-bold  pb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              autoComplete=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="author" className="text-sm block font-bold  pb-2">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              autoComplete=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="Author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="url" className="text-sm block font-bold  pb-2">
              Url
            </label>
            <input
              type="text"
              name="url"
              id="url"
              autoComplete=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="Url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="my-4 mx-8">
      <Notifications />
      <h1 className="text-red-700 text-4xl font-black">Blog</h1>
      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

export default App;
