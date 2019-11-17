import React from "react";
import { useField } from "../../hooks/useField";

const BirthYear = ({ onUpdate, names }) => {
  const { set: setName, ...name } = useField("text");
  const { set: setBorn, ...born } = useField("text");
  const handleSubmit = event => {
    event.preventDefault();
    onUpdate(name.value, born.value);
    setName("");
    setBorn("");
  };

  const handleNameSelect = event => {
    setName(event.target.value);
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={handleSubmit}>
        name:
        <br />
        <select value={name.value} onChange={handleNameSelect}>
          {names &&
            names.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
        </select>
        <br />
        born:
        <br />
        <input {...born} />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default BirthYear;
