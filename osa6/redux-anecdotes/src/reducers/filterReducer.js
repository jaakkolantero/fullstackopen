const filterReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter ? action.filter : null;
    default:
      return state;
  }
};

export const filterChange = filter => {
  return {
    type: "SET_FILTER",
    filter
  };
};

export default filterReducer;
