import React from "react";

export default function Filter({ handleFilter, filter }) {
  return (
    <>
      <div>
        Filter:
        <input onChange={handleFilter} value={filter} />
      </div>
    </>
  );
}
