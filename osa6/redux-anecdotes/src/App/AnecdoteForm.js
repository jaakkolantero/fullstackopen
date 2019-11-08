import React from "react";
import { useField } from "../hooks";
import { add } from "../reducers/anecdoteReducer";
import {
  setNotification,
  resetNotification
} from "../reducers/notificationReducer";
import { connect } from "react-redux";

export const AnecdoteForm = ({ add, setNotification, resetNotification }) => {
  const { set: setAnecdote, ...anecdote } = useField("text");

  const handleNewAnecdote = event => {
    event.preventDefault();
    const newAnecdote = event.target.anecdote.value;
    add(newAnecdote);
    setAnecdote("");
    setNotification(`created anecdote ${newAnecdote}!`);
    setTimeout(() => {
      resetNotification();
    }, 5000);
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

const mapDispatchToProps = {
  add,
  setNotification,
  resetNotification
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
