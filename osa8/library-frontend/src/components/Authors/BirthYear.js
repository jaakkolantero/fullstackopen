import React from "react";
import { useField } from "../../hooks/useField";

const BirthYear = ({ onUpdate }) => {
  const { set: setName, ...name } = useField("text");
  const { set: setBorn, ...born } = useField("text");
  const handleSubmit = event => {
    event.preventDefault();
    onUpdate(name.value, born.value);
    setName("");
    setBorn("");
  };
  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={handleSubmit}>
        name:
        <br />
        <input {...name} />
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
