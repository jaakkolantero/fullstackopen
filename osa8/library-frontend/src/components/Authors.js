import React from "react";
import BirthYear from "./Authors/BirthYear";

const Authors = ({ show, authors, onUpdateBirthYear }) => {
  if (!show) {
    return null;
  }

  return authors ? (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYear onUpdate={onUpdateBirthYear} />
    </div>
  ) : (
    <div>Loading authors..</div>
  );
};

export default Authors;
