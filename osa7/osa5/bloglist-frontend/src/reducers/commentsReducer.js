import blogService from "../services/blogs";

export const getId = () => (100000 * Math.random()).toFixed(0);

const reducer = (state = [], action) => {
  switch (action.type) {
  case "GETCOMMENTS":
    return action.comments;
  case "CREATE":
    return [...state, action.comment];
  default:
    return state;
  }
};

export const getComments = () => {
  return async dispatch => {
    const comments = await blogService.getComments();
    dispatch({
      type: "GETCOMMENTS",
      comments
    });
  };
};

export const create = (comment, id, token) => {
  return async dispatch => {
    const newComment = await blogService.createComment(comment, id, token);
    dispatch({
      type: "CREATE",
      comment: newComment
    });
  };
};

export default reducer;
