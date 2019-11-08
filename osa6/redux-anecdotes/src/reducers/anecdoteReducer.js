import anecdoteService from "../services/anecdotes";

export const getId = () => (100000 * Math.random()).toFixed(0);

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      return action.anecdotes;
    case "VOTE":
      return state.map(item => {
        return item.id !== action.id
          ? item
          : { ...item, votes: item.votes + 1 };
      });
    case "ADDWITHEXTRAS":
    case "ADD":
      return [...state, action.anecdote];
    default:
      return state;
  }
};

export const vote = anecdote => {
  return async dispatch => {
    await anecdoteService.vote(anecdote);
    dispatch({
      type: "VOTE",
      id: anecdote.id
    });
  };
};

export const add = anecdote => {
  return {
    type: "ADD",
    anecdote: { content: anecdote, id: getId(), votes: 0 }
  };
};

export const addWithExtras = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch({
      type: "ADDWITHEXTRAS",
      anecdote: newAnecdote
    });
  };
};

export const init = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      anecdotes
    });
  };
};

export default reducer;
