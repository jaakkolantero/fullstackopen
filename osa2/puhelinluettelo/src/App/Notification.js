import React from "react";

export default function Notification({ negative, message, display }) {
  const baseStyle =
    "bg-gray-100 px-4 py-2 mx-8 my-4 rounded max-w-sm uppercase";

  const typeStyle = negative
    ? `border border-red-500 `
    : `border border-green-500 `;

  if (display) {
    return <div className={`${baseStyle} ${typeStyle}`}>{message}</div>;
  } else return null;
}
