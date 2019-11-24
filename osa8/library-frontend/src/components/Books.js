import React, { useState, useMemo } from "react";
import useSWR from "swr";
import request from "graphql-request";

const API = "http://localhost:4000/graphql";
export const ALLBOOKS_FILTER_GENRE = `
  query($genre: String!){
    allBooks(genre:$genre){
      author {name}
      title
      published
      genres
  }
}`;

const Books = ({ show, books }) => {
  const [filter, setfilter] = useState(null);
  const [uniqueGenres, setuniqueGenres] = useState(null);
  const params = useMemo(() => ({ filter, ...books }), [books, filter]);
  const { data: visibleBooks } = useSWR(
    [ALLBOOKS_FILTER_GENRE, params],
    (query, { filter }) => request(API, query, { genre: filter ? filter : "" })
  );

  React.useEffect(() => {
    if (books && !uniqueGenres) {
      setuniqueGenres(
        books
          .flatMap(book => book.genres)
          .filter((cur, i, arr) => arr.indexOf(cur) === i)
          .concat(["all"])
      );
    }
  }, [books, uniqueGenres]);

  if (!show) {
    return null;
  }

  const filterGenre = genre => {
    if (genre === "all") {
      setfilter(null);
    } else {
      setfilter(genre);
    }
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {visibleBooks &&
            visibleBooks.allBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres
          ? uniqueGenres.map(genre => (
              <button onClick={() => filterGenre(genre)} key={genre}>
                {genre}
              </button>
            ))
          : null}
      </div>
    </div>
  );
};

export default Books;
