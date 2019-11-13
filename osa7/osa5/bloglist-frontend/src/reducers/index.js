import { combineReducers } from "redux";
import notificationReducer from "./notificationReducer";
import blogServiceReducer from "./blogServiceReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import commentsReducer from "./commentsReducer";
export default combineReducers({
  notification: notificationReducer,
  blogs: blogServiceReducer,
  user: userReducer,
  users: usersReducer,
  comments: commentsReducer
});
