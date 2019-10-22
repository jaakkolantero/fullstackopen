import React from "react";

export default function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}
