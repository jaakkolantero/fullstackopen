import React from "react";
import Part from "./Content/Part";

export default function Content({ parts }) {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
}
