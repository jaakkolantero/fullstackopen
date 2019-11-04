import React from "react";
import "./styles/tailwind.css";

function App() {
  return (
    <div className="w-full flex mt-32 ml-8">
      <div className=" max-w-md bg-gray-100 rounded overflow-hidden">
        <h1 className="text-base uppercase font-bold text-gray-700 px-8 pt-8 pb-4">
          Log in to application
        </h1>
        <form action="" className="shadow-md px-8 pb-8">
          <div className="px-4 pb-4">
            <label htmlFor="username" className="text-sm block font-bold  pb-2">
              username
            </label>
            <input
              type="text"
              name="username"
              id=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="Johnbull@example.com"
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="password" className="text-sm block font-bold pb-2">
              password
            </label>
            <input
              type="password"
              name="password"
              id=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
