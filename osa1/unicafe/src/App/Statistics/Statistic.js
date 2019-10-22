import React from "react";

export default function Statistic({ title, children }) {
  return (
    <tr>
      <th style={{ textAlign: "left" }}>{title}</th>
      <th>{children}</th>
    </tr>
  );
}
