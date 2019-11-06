import React, { useState, useEffect } from "react";

const BlogListing = ({ blogs, loggedInUser, onUpdate, onDelete }) => {
  const [blogsWithExtras, setBlogWithExtras] = useState([]);

  const toggleShow = id => {
    const newBlogWithExtras = blogsWithExtras.map(blog =>
      blog.id === id ? { ...blog, show: !blog.show } : blog
    );
    setBlogWithExtras(newBlogWithExtras);
  };

  const toggleConfirm = id => {
    const newBlogWithExtras = blogsWithExtras.map(blog =>
      blog.id === id ? { ...blog, confirm: !blog.confirm } : blog
    );
    setBlogWithExtras(newBlogWithExtras);
  };

  useEffect(() => {
    if (blogs) {
      const newBlogWithExtras = blogs.map(blog => ({
        ...blog,
        confirm: false,
        show: false
      }));
      setBlogWithExtras(newBlogWithExtras);
    }
  }, [blogs]);

  const additionalInfo = blog => {
    console.log(blogsWithExtras);
    const { user, likes, author, title, url, id, confirm } = blog;
    return (
      <div className="bg-indigo-100 py-2 px-4">
        <a
          className="inline-block text-blue-700 hover:text-blue-900"
          href={url}
        >
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
        {user.username === loggedInUser.username ? (
          <>
            {!confirm && (
              <button
                onClick={() => toggleConfirm(id)}
                className=" ml-3 inline-block rounded-sm px-2 py-1 overflow-hidden bg-red-200 hover:bg-red-500 border border-gray-700"
              >
                Delete
              </button>
            )}
            {confirm && (
              <>
                <button
                  onClick={() => onDelete(id)}
                  className=" ml-3 inline-block rounded-sm px-2 py-1 overflow-hidden bg-yellow-200 hover:bg-yellow-500 border border-gray-700"
                >
                  Confirm delete
                </button>
                <button
                  className=" ml-3 inline-block px-2 py-1 underline text-gray-700 hover:text-gray-900"
                  onClick={() => toggleConfirm(id)}
                >
                  Cancel
                </button>
              </>
            )}
          </>
        ) : null}

        <div>
          Added by {user.name} aka {user.username}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="font-bold py-4 px-4 text-gray-700">Blogs</h2>
      <div className="mt-3">
        {blogsWithExtras
          .sort((a, b) => (a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0))
          .map((blog, i) => (
            <div
              className="rounded overflow-hidden bg-indigo-200 border border-gray-200 mb-3"
              key={blog.id}
            >
              <div
                className="text-indigo-800 py-2 px-4 border-b border-indigo-700"
                onClick={() => toggleShow(blog.id)}
              >
                {blog.title} - {blog.author}
              </div>
              {blog.show ? additionalInfo(blog) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogListing;
