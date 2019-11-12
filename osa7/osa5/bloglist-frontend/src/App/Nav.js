import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="inline">
      <Link className="mr-3 text-pink-600 hover:text-pink-800" to="/">
        home/blogs
      </Link>
      <Link className="mr-3 text-pink-600 hover:text-pink-800" to="/users">
        users
      </Link>
    </div>
  );
};
