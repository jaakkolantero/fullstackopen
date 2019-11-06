import React, { useState } from "react";

const BlogListing = ({ blogs, user, onUpdate }) => {
  const [show, setShow] = useState([...Array(blogs.length)]);
  const toggle = index => {
    const newShow = [...show];
    newShow[index] = show[index] ? false : true;
    setShow([...newShow]);
  };

  const additionalInfo = blog => {
    const { user, likes, author, title, url } = blog;
    return (
      <div className="bg-indigo-100 py-2 px-4">
        <a className="block text-blue-700 hover:text-blue-900" href={url}>
          {url}
        </a>
        <div>
          likes:<b>{likes}</b>
        </div>
        <button
          onClick={() =>
            onUpdate(blog.id, {
              author,
              title,
              url,
              user: user.id,
              likes: likes + 1
            })
          }
          className="inline-block rounded-sm px-2 py-1 overflow-hidden bg-green-200 hover:bg-green-500 border border-gray-700"
        >
          like
        </button>
        <div>Added by {user.name}</div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="font-bold py-4 px-4 text-gray-700">Blogs</h2>
      <div className="mt-3">
        {blogs.map((blog, i) => (
          <div
            className="rounded overflow-hidden bg-indigo-200 border border-gray-200 mb-3"
            key={blog.id}
          >
            <div
              className="text-indigo-800 py-2 px-4 border-b border-indigo-700"
              onClick={() => toggle(i)}
            >
              {blog.title} - {blog.author}
            </div>
            {show[i] ? additionalInfo(blog) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListing;
