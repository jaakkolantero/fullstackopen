import React, { useState } from "react";

export default function List({ persons, onDelete }) {
  const [confirm, setConfirm] = useState(0);

  const confirmDelete = person => {
    onDelete(person);
  };

  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <div key={person.name.concat(i)}>
          {person.name}
          <span> {person.number}</span>
          <span>
            {" "}
            <button onClick={() => setConfirm(person.id)}>delete</button>
          </span>
          {confirm === person.id && (
            <div>
              <button onClick={() => confirmDelete(person)}>Confirm</button>
              <button onClick={() => setConfirm(0)}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
