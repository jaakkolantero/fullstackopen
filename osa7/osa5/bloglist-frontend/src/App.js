import React, { useEffect } from "react";
import Notifications from "react-notify-toast";
import loginService from "./services/login";
import blogService from "./services/blogs";
import "./styles/tailwind.css";
import { useLocalStorage, useField } from "./hooks";
import Toggle from "./App/Toggle";
import BlogListing from "./App/BlogListing";
import { notify } from "./reducers/notificationReducer";
import { create, getAll, update } from "./reducers/blogServiceReducer";
import { setUser as loginUser, resetUser } from "./reducers/userReducer";
import { getAll as getUsers } from "./reducers/usersReducer";
import { connect, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import UsersListing from "./App/UsersListing";
import { SingleBlog } from "./App/SingleBlog";

const App = ({
  notify,
  create,
  getAll,
  update,
  loginUser,
  resetUser,
  getUsers
}) => {
  const { set: setUserName, ...username } = useField("text");
  const { set: setPassword, ...password } = useField("password");
  const { set: setTitle, ...title } = useField("text");
  const { set: setAuthor, ...author } = useField("text");
  const { set: setUrl, ...url } = useField("text");

  const blogs = useSelector(state => state.blogs);
  const [savedUser, setSavedUser] = useLocalStorage("user", null);
  const loggedInUser = useSelector(state => state.user);

  useEffect(() => {
    if (loggedInUser) {
      if (!savedUser) {
        setSavedUser(loggedInUser);
      }
      fetchBlogs();
      getUsers();
    }
    if (savedUser) {
      loginUser(savedUser);
    }
  }, [loggedInUser]);

  useEffect(() => {}, [savedUser]);

  useEffect(() => {
    console.log("blogs", blogs);
  }, [blogs]);

  const fetchBlogs = () => {
    getAll();
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      loginUser(user);
      setUserName("");
      setPassword("");
      fetchBlogs();
    } catch (error) {
      notify("wrong username or password", "error", 3000);
      console.log("error", error);
    }
  };

  const handleLogout = () => {
    resetUser();
    setSavedUser(null);
  };

  const handleAddBlog = event => {
    event.preventDefault();
    if (!(title && author && url)) {
      notify("error! title author or url missing.", "error", 3000);
      console.log("error! title author or url missing.");
      return;
    }
    try {
      create(
        { title: title.value, author: author.value, url: url.value },
        loggedInUser.token
      );
      notify("Blog added!", "success", 3000);
      fetchBlogs();
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      notify("Error Creating blog", "error", 3000);
      console.log("error creating blog", error);
    }
  };

  const handleUpdateBlog = (id, blogToUpdate) => {
    try {
      update(id, blogToUpdate);
      fetchBlogs();
      notify("update!", "success", 3000);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleDeleteBlog = id => {
    try {
      blogService.deleteItem(id, loggedInUser.token).then(() => {
        fetchBlogs();
        notify("Deleted blog", "error", 3000);
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const loginForm = () => {
    return (
      <div data-testid="loginform-container" className="w-full flex mt-32 ml-8">
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
                {...username}
                name="username"
                id="username"
                autoComplete="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                placeholder="username"
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
                {...password}
                name="password"
                id="password"
                autoComplete="current-password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                placeholder="Enter your password"
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
      <div data-testid="blogform-container">
        <div className="text-sm text-gray-700 my-3">
          {loggedInUser.name} logged in!
          <button
            onClick={() => handleLogout()}
            className="inline-block ml-3 rounded-sm px-2 py-1 overflow-hidden bg-red-200 hover:bg-red-500 border border-gray-700"
          >
            Log out
          </button>
        </div>
        <Switch>
          <Route path="/users">
            <UsersListing />
          </Route>
          <Route path="/blogs/:blogId">
            <SingleBlog
              onUpdate={handleUpdateBlog}
              onDelete={handleDeleteBlog}
              blogs={blogs}
              loggedInUser={loggedInUser}
            />
          </Route>
          <Route path="/">
            <Toggle showText="Create blog ▼" hideText="Hide ▲">
              <div className="my-3">{addBlogForm()}</div>
            </Toggle>
            <BlogListing
              onUpdate={handleUpdateBlog}
              onDelete={handleDeleteBlog}
              blogs={blogs}
              loggedInUser={loggedInUser}
            />
          </Route>
        </Switch>
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
              {...title}
              name="title"
              id="title"
              autoComplete=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="title"
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="author" className="text-sm block font-bold  pb-2">
              Author
            </label>
            <input
              {...author}
              name="author"
              id="author"
              autoComplete=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="Author"
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="url" className="text-sm block font-bold  pb-2">
              Url
            </label>
            <input
              {...url}
              name="url"
              id="url"
              autoComplete=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="Url"
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
    <div data-testid="app-container" className="my-4 mx-8">
      <Notifications />
      <h1 className="text-red-700 text-4xl font-black">Blog</h1>
      {loggedInUser === null ? loginForm() : blogForm()}
    </div>
  );
};

export default connect(
  null,
  { notify, create, update, getAll, loginUser, resetUser, getUsers }
)(App);
