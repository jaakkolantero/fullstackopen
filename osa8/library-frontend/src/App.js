import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import useSWR, { trigger } from "swr";
import { request } from "graphql-request";
import { useLocalStorage } from "./hooks/useLocalStorage";
import LoginForm from "./components/LoginForm";

const API = "http://localhost:4000/graphql";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useLocalStorage("library-user-token", null);
  const query = `{
    allAuthors {
      name
      born
      bookCount
    }
    allBooks{
      title
      author {name}
      published
	  }
  }`;
  const { data, error } = useSWR(query, query => request(API, query));

  useEffect(() => {
    data && console.log("data", data);
    error && console.log("error", error);
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

  const logout = () => {
    setToken(null);
  };

  const navigation = () => {
    return (
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>logout</button>
      </div>
    );
  };

  const login = async ({ username, password }) => {
    const LOGIN = `mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }`;
    return await request(API, LOGIN, { username, password });
  };

  const loginForm = () => {
    return (
      <div>
        <LoginForm login={login} setToken={token => setToken(token)} />
      </div>
    );
  };

  const content = () => {
    return (
      <div>
        {navigation()}
        {data ? pages() : <div>Loading...</div>}
      </div>
    );
  };

  return <div>{token ? content() : loginForm()}</div>;
};

export default App;
