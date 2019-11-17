import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import useSWR, { trigger } from "swr";
import { request } from "graphql-request";

const API = "http://localhost:4000/graphql";

const App = () => {
  const [page, setPage] = useState("authors");
  const query = `{
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
  }`;
  const { data, error } = useSWR(query, query => request(API, query));

  useEffect(() => {
    console.log("data", data);
    console.log("error", error);
  }, [data, error]);

  const handleBookCreate = () => {
    console.log("Triggering");
    trigger(query);
  };

  const handleUpdateBirthYear = (name, born) => {
    const mutation = `mutation(
      $name: String!
      $setBornTo: Int!
    ) {
      editAuthor(
        name: $name,
        setBornTo: $setBornTo,
      ) {
        name,
        born
      }
    }`;
    request(API, mutation, {
      name,
      setBornTo: Number(born)
    }).then(data => console.log("editAuthor", data));
    trigger(query);
  };

  const pages = () => {
    return (
      <>
        <Authors
          show={page === "authors"}
          authors={data.allAuthors}
          onUpdateBirthYear={handleUpdateBirthYear}
        />
        <Books show={page === "books"} books={data.allBooks} />
        <NewBook show={page === "add"} onCreate={handleBookCreate} />
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
