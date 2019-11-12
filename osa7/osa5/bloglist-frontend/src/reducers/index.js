import { combineReducers } from "redux";
import notificationReducer from "./notificationReducer";
import blogServiceReducer from "./blogServiceReducer";
export default combineReducers({
  notification: notificationReducer,
  blogs: blogServiceReducer
});
