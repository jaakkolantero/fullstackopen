import React, { useState } from "react";

const Books = ({ show, books }) => {
  const [uniqueGenres, setuniqueGenres] = useState(null);
  const [visibleBooks, setvisibleBooks] = useState(books);

  React.useEffect(() => {
    books &&
      setuniqueGenres(
        books
          .flatMap(book => book.genres)
          .filter((cur, i, arr) => arr.indexOf(cur) === i)
          .concat(["all"])
      );
  }, [books]);

  if (!show) {
    return null;
  }

  const filterGenre = genre => {
    if (genre === "all") {
      setvisibleBooks(books);
    } else {
      setvisibleBooks(books.filter(book => book.genres.includes(genre)));
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
          {visibleBooks.map(a => (
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
