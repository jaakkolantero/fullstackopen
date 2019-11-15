import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import useSWR from "swr";
import { request } from "graphql-request";

const API = "http://localhost:4000/graphql";

const App = () => {
  const [page, setPage] = useState("authors");
  const { data, error } = useSWR(
    `{
    allAuthors {
      name
      born
      bookCount
    }
    allBooks{
      title
      author
      published
	  }
  }`,
    query => request(API, query)
  );

  useEffect(() => {
    console.log("authors", data);
    console.log("error", error);
  }, [data, error]);

  const pages = () => {
    return (
      <>
        <Authors show={page === "authors"} authors={data.allAuthors} />
        <Books show={page === "books"} books={data.allBooks} />
        <NewBook show={page === "add"} />
      </>
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      {data ? pages() : <div>Loading...</div>}
    </div>
  );
};

export default App;
