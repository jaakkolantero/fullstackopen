import React from "react";
import { filterChange } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = ({ filterChange }) => {
  const handleChange = ({ target: { value } }) => {
    filterChange(value);
  };
  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterChange
};

export default connect(
  null,
  mapDispatchToProps
)(Filter);
