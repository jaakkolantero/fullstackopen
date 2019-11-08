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

export const notify = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: "SET",
      payload: notification
    });
    setTimeout(() => {
      dispatch({
        type: "RESET"
      });
    }, time * 1000);
  };
};
