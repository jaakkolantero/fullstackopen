import usersService from "../services/users";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case "SET":
    return payload;
  default:
    return state;
  }
};

export const setUsers = payload => ({ type: "SET", payload });

export const getAll = () => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch({
      type: "SET",
      payload: users
    });
  };
};
