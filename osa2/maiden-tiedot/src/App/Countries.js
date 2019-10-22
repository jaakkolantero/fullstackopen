import React from "react";
import List from "./Countries/List";
import Country from "./Countries/Country";

export default function Countries({ countries }) {
  if (countries.length > 10) return <p>Too many.</p>;
  if (countries.length <= 10 && countries.length > 1)
    return <List countries={countries} />;
  if (countries.length === 1) return <Country country={countries[0]} />;
  else return <p>Not found.</p>;
}
