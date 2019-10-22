import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Country({ country }) {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        "request",
        `http://api.weatherstack.com/current?access_key=e320403c8a8590a152f3816e4e61e7ae&query=${country.capital}`
      );
      const result = await axios(
        `http://api.weatherstack.com/current?access_key=e320403c8a8590a152f3816e4e61e7ae&query=${country.capital}`
      );
      setWeather(result.data);
      console.log("result", result);
    };
    fetchData();
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" width="300"></img>
      {weather.current ? (
        <>
          <h2>Weather in {country.capital}</h2>
          <p>temperature: {weather.current.temperature}</p>
          <img src={weather.current.weather_icons[0]} alt="weather" />
          <p>
            wind: {weather.current.wind_speed} kph direction:{" "}
            {weather.current.wind_dir}
          </p>
        </>
      ) : null}
    </div>
  );
}
