import React from "react";
import Header from "./Course/Header";
import Content from "./Course/Content";
import Total from "./Course/Total";

export default function Course({ courses }) {
  return (
    <>
      {courses.map(course => (
        <div key={course.name}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
}
