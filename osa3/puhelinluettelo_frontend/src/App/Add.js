import React from "react";

export default function Add({
  handleCreate,
  setNewName,
  newName,
  setNewNumber,
  newNumber
}) {
  return (
    <>
      <h3>Add a new</h3>
      <form onSubmit={handleCreate}>
        <div>
          name:{" "}
          <input onChange={e => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          number:{" "}
          <input
            onChange={e => setNewNumber(e.target.value)}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}
