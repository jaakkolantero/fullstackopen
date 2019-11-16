import React, { useState, useEffect } from "react";
import useSWR, { trigger } from "swr";
import request from "graphql-request";

const API = "http://localhost:4000/graphql";

const NewBook = ({ show, onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [data, setData] = useState({});
  const mutation = `mutation(
      $title: String!
      $author: String!
      $published: Int!
      $genres: [String!]!
    ) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author
  }
}`;

  useEffect(() => {
    if (data) {
    }
  }, [data, onCreate]);

  if (!show) {
    return null;
  }

  const resetFields = () => {
    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const submit = async e => {
    e.preventDefault();
    if (!title || !author || !published || !genres.length) {
      console.log("error, missing data");
    } else {
      request(API, mutation, {
        title,
        author,
        genres,
        published: Number(published)
      }).then(data => {
        setData(data);
        onCreate();
        resetFields();
      });
    }
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
