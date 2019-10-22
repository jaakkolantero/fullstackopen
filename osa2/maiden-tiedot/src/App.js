import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./App/Filter";
import Countries from "./App/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setfiltered] = useState([]);

  const [filter, setFilter] = useState("");

  const handleFilter = e => {
    setFilter(e.target.value);
    setfiltered(
      countries.filter(country =>
        country.name.toUpperCase().includes(e.target.value.toUpperCase())
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://restcountries.eu/rest/v2/all");
      setCountries(result.data);
      setfiltered(result.data);
      console.log("result", result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Countries countries={filtered} />
    </div>
  );
}

export default App;
