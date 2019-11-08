import { combineReducers } from "redux";
import anecdoteReducer from "./anecdoteReducer";
import notificationReducer from "./notificationReducer";
export default combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer
});
