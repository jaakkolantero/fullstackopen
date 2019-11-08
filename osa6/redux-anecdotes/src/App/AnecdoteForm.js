import React from "react";
import { useField } from "../hooks";
import { addWithExtras } from "../reducers/anecdoteReducer";
import {
  setNotification,
  resetNotification
} from "../reducers/notificationReducer";
import { connect } from "react-redux";

export const AnecdoteForm = ({
  addWithExtras,
  setNotification,
  resetNotification
}) => {
  const { set: setAnecdote, ...anecdote } = useField("text");

  const handleNewAnecdote = async event => {
    event.preventDefault();
    const newAnecdote = event.target.anecdote.value;
    addWithExtras(newAnecdote);
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
  addWithExtras,
  setNotification,
  resetNotification
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
