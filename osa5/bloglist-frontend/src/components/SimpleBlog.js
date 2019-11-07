import React from "react";

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div data-testid="simpleblog-titleAndAuthor">
      {blog.title} {blog.author}
    </div>
    <div data-testid="simpleblog-likes">
      blog has {blog.likes} likes
      <button onClick={onClick} data-testid="simpleblog-button">
        like
      </button>
    </div>
  </div>
);

export default SimpleBlog;
