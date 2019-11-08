import React from "react";
import { useField } from "../hooks";
import { add } from "../reducers/anecdoteReducer";

export const AnecdoteForm = ({ store }) => {
  const { set: setAnecdote, ...anecdote } = useField("text");

  const handleNewAnecdote = event => {
    event.preventDefault();
    console.log("anecdote", event.target);
    const newAnecdote = event.target.anecdote.value;
    store.dispatch(add(newAnecdote));
    setAnecdote("");
  };

  return (
    <form onSubmit={handleNewAnecdote}>
      <div>
        <input name="anecdote" {...anecdote} />
      </div>
      <button>create</button>
    </form>
  );
};
