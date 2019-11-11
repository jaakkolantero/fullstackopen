import { notify as _notify } from "react-notify-toast";
const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case "NOTIFY":
    return payload;
  case "RESET":
    return null;
  default:
    return state;
  }
};

export const setNotification = payload => ({ type: "SET", payload });
export const resetNotification = payload => ({ type: "RESET", payload });

export const notify = (notification, type, time) => {
  return async dispatch => {
    dispatch({
      type: "NOTIFY",
      payload: { notification, type, time }
    });
    _notify.show(notification, type, time);
  };
};
