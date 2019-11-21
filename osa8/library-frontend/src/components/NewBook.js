import React, { useState } from "react";
import request, { GraphQLClient } from "graphql-request";

const API = "http://localhost:4000/graphql";

const NewBook = ({ show, onCreate, token }) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
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
    author{name}
  }
}`;

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
      const client = new GraphQLClient(API, {
        headers: { authorization: token ? `bearer ${token}` : null }
      });
      client
        .request(mutation, {
          title,
          author,
          genres,
          published: Number(published)
        })
        .then(() => {
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
