import React from "react";

export default function Filter({ handleFilter, filter }) {
  return (
    <>
      <div>
        find countries:
        <input onChange={handleFilter} value={filter} />
      </div>
    </>
  );
}
