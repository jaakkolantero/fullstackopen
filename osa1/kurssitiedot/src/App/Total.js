import React from "react";

export default function Total({ parts }) {
  const total = parts.reduce((result, { exercises }) => result + exercises, 0);

  return (
    <div>
      <p>Number of exercises {total} </p>
    </div>
  );
}
