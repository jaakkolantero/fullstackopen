import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useField } from "../hooks";

export const SingleBlog = ({
  blogs,
  loggedInUser,
  onUpdate,
  onDelete,
  comments,
  onComment
}) => {
  let { blogId } = useParams();
  const [blogsWithExtras, setBlogWithExtras] = useState({});
  const { set: setNewComment, ...newComment } = useField("text");

  const toggleConfirm = () => {
    const newBlogWithExtras = {
      ...blogsWithExtras,
      confirm: !blogsWithExtras.confirm
    };
    setBlogWithExtras(newBlogWithExtras);
  };

  const handleCommentSubmit = event => {
    event.preventDefault();
    if (newComment.value) {
      onComment(newComment.value, blogsWithExtras.id);
      setNewComment("");
    }
  };

  useEffect(() => {
    const newBlogWithExtras = {
      ...blogs.find(blog => blog.id === blogId),
      confirm: false
    };
    setBlogWithExtras(newBlogWithExtras);
  }, [blogs, blogId]);

  const additionalInfo = blog => {
    const { user, likes, author, title, url, id, confirm } = blog;
    const usersComments = comments.filter(comments => comments.blogId === id);
    return (
      <div
        data-testid="bloglisting-additional"
        className="bg-indigo-100 py-2 px-4"
      >
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
        <h2 className="text-gray-700 text-2xl">Comments</h2>
        <form onSubmit={handleCommentSubmit}>
          <input
            className="rounded py-2 px-1 border border-gray-500"
            {...newComment}
            name="newComment"
          ></input>
          <button
            type="submit"
            className=" ml-3 rounded py-2 px-4 bg-blue-600 text-blue-200"
          >
            Add comment
          </button>
        </form>
        {usersComments.length ? (
          <ul>
            {usersComments.map(comment => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        ) : (
          <div>no comments</div>
        )}
      </div>
    );
  };

  return blogsWithExtras.id ? (
    <div>
      <div>
        {blogsWithExtras.title} - {blogsWithExtras.author}
      </div>
      <div>{additionalInfo(blogsWithExtras)}</div>
    </div>
  ) : (
    <div>blog not found</div>
  );
};
