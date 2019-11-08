const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET":
      return payload;
    case "RESET":
      return null;
    default:
      return state;
  }
};

export const setNotification = payload => ({ type: "SET", payload });
export const resetNotification = payload => ({ type: "RESET", payload });
