import React from "react";
import { vote } from "../reducers/anecdoteReducer";

export const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes;
  return (
    <div>
      {anecdotes
        .sort((a, b) => (a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0))
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => store.dispatch(vote(anecdote.id))}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
