import React, { useState } from "react";

const Recomended = ({ show, user, books }) => {
  const [favoriteBooks, setfavoriteBooks] = useState([]);

  React.useEffect(() => {
    if (books.length && user) {
      setfavoriteBooks(
        books.filter(book => book.genres.includes(user.me.favoriteGenre))
      );
    }
  }, [user, books]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recomended for you</h2>
      <ul>
        {favoriteBooks.length ? (
          favoriteBooks.map(book => (
            <li key={book.title}>
              {book.title} - {book.author.name} - {book.published}
            </li>
          ))
        ) : (
          <li>no recommendations</li>
        )}
      </ul>
    </div>
  );
};

export default Recomended;
