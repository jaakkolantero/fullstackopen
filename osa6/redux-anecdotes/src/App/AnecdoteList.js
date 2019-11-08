import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  resetNotification
} from "../reducers/notificationReducer";

export const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes;
  const filter = store.getState().filter;

  const handleVote = anecdote => {
    store.dispatch(vote(anecdote.id));
    store.dispatch(setNotification(`voted ${anecdote.content}!`));
    setTimeout(() => {
      store.dispatch(resetNotification());
    }, 5000);
    //TODO: debounce to make it work with multiple votes
  };
  return (
    <div>
      {anecdotes
        .filter(anecdote =>
          filter
            ? anecdote.content.toLowerCase().includes(filter.toLowerCase())
            : anecdote
        )
        .sort((a, b) => (a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0))
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};
