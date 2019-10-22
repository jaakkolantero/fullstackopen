import React, { useState } from "react";
import Country from "./Country";

export default function List({ countries }) {
  const [show, setShow] = useState({});

  return (
    <>
      {show.name ? (
        <Country country={show} />
      ) : (
        <>
          {countries.map((country, i) => (
            <div key={country.name}>
              {country.name}
              <span>
                <button onClick={() => setShow(country)}>show</button>
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
}
