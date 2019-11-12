import blogService from "../services/blogs";

export const getId = () => (100000 * Math.random()).toFixed(0);

const reducer = (state = [], action) => {
  switch (action.type) {
    case "GETALL":
      return action.blogs;
    case "UPDATE":
      return state.map(item => {
        return item.id !== action.id ? item : { ...item, ...action.blog };
      });
    case "CREATE":
      return [...state, action.blog];
    default:
      return state;
  }
};

export const update = (id, blog) => {
  return async dispatch => {
    await blogService.update(id, blog);
    dispatch({
      type: "UPDATE",
      id,
      blog
    });
  };
};

export const create = (blog, token) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog, token);
    dispatch({
      type: "CREATE",
      blog: newBlog
    });
  };
};

export const getAll = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "GETALL",
      blogs
    });
  };
};

export default reducer;
