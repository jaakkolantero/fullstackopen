import React from "react";
import { useField } from "../hooks";
import { addWithExtras } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";
import { connect } from "react-redux";

export const AnecdoteForm = ({ addWithExtras, notify }) => {
  const { set: setAnecdote, ...anecdote } = useField("text");

  const handleNewAnecdote = async event => {
    event.preventDefault();
    const newAnecdote = event.target.anecdote.value;
    addWithExtras(newAnecdote);
    setAnecdote("");
    notify(`created anecdote ${newAnecdote}!`, 5);
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
  notify
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
