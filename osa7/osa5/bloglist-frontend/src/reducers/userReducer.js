const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case "LOGIN":
    return payload;
  case "RESET":
    return null;
  default:
    return state;
  }
};

export const setUser = payload => ({ type: "LOGIN", payload });
export const resetUser = payload => ({ type: "RESET", payload });
