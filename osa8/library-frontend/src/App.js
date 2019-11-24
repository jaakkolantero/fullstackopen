import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import useSWR, { mutate } from "swr";
import { request, GraphQLClient } from "graphql-request";
import { useLocalStorage } from "./hooks/useLocalStorage";
import LoginForm from "./components/LoginForm";
import Recomended from "./components/Recomended";

const API = "http://localhost:4000/graphql";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useLocalStorage("library-user-token", null);
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(null);
  const params = React.useMemo(() => ({ ...update }), [update]);
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
      genres
	  }
  }`;
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
  const { data } = useSWR([query, params], query => request(API, query));

  useEffect(() => {
    if (token) {
      const client = new GraphQLClient(API, {
        headers: { authorization: token ? `bearer ${token}` : null }
      });
      const ME = `{me{username,favoriteGenre,id}}`;
      client.request(ME).then(response => setUser(response));
    }
  }, [token]);

  const handleBookCreate = async newBook => {
    const client = new GraphQLClient(API, {
      headers: { authorization: token ? `bearer ${token}` : null }
    });
    const { addBook } = await client.request(mutation, { ...newBook });
    mutate(query, { ...data, allBooks: [...data.allBooks, addBook] });
    setUpdate(newBook);
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
    const client = new GraphQLClient(API, {
      headers: { authorization: token ? `bearer ${token}` : null }
    });
    client
      .request(mutation, {
        name,
        setBornTo: Number(born)
      })
      .then(({ editAuthor }) => {
        mutate(query, {
          ...data,
          allAuthors: data.allAuthors.map(author =>
            author.name === editAuthor.name ? editAuthor : author
          )
        });
        setUpdate(editAuthor);
      });
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
        <NewBook
          show={page === "add"}
          onCreate={handleBookCreate}
          token={token}
        />
        <Recomended
          show={page === "recomended"}
          user={user}
          books={data.allBooks}
        />
        {loginForm({ show: page === "login" })}
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
        {token ? (
          <div>
            <button onClick={() => setPage("recomended")}>
              <span role="img" aria-label="recomended">
                💕
              </span>
            </button>
            <button onClick={logout}>logout</button>
          </div>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
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

  const handleSetToken = newToken => {
    setToken(newToken);
    setPage("authors");
  };

  const loginForm = ({ show }) => {
    if (!show) {
      return null;
    }
    return (
      <div>
        <LoginForm login={login} setToken={handleSetToken} />
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

  return <div>{content()}</div>;
};

export default App;
