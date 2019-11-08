const getId = () => (100000 * Math.random()).toFixed(0);

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
    case "ADD":
      return [...state, action.anecdote];

    default:
      break;
  }

  return state;
};

export const vote = id => {
  return {
    type: "VOTE",
    id
  };
};

export const add = anecdote => {
  return {
    type: "ADD",
    anecdote: { content: anecdote, id: getId(), votes: 0 }
  };
};

export const init = anecdotes => ({ type: "INIT", anecdotes });

export default reducer;
