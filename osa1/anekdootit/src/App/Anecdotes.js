import React, { useReducer } from "react";

export default function Anecdotes({ anecdotes }) {
  const [items, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "vote":
          const updatedAnectodes = state.anecdotes.map((item, index) => {
            if (index !== action.index) {
              return item;
            }
            return { ...item, votes: item.votes + 1 };
          });
          return {
            ...state,
            mostVotes: updatedAnectodes.reduce((prev, current) =>
              prev.votes > current.votes ? prev : current
            ),
            anecdotes: updatedAnectodes
          };

        case "next":
          return {
            ...state,
            current: Math.floor(Math.random() * state.anecdotes.length)
          };
        default:
          return state;
      }
    },
    {
      current: 0,
      mostVotes: { anecdote: "", votes: 0 },
      anecdotes: anecdotes.map(anecdote => ({ anecdote: anecdote, votes: 0 }))
    }
  );

  console.log("items", items);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{items.anecdotes[items.current].anecdote}</p>
      <p>has {items.anecdotes[items.current].votes} votes</p>
      <button onClick={() => dispatch({ type: "vote", index: items.current })}>
        vote
      </button>
      <button onClick={() => dispatch({ type: "next" })}>Next anecdote</button>
      {items.mostVotes.votes > 0 && (
        <div>
          <h1>Anecdote with most votes</h1>
          <p>{items.mostVotes.anecdote}</p>
        </div>
      )}
    </div>
  );
}
