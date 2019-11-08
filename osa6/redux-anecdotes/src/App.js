import React from "react";
import { vote, add } from "./reducers/anecdoteReducer";
import { useField } from "./hooks";

const App = ({ store }) => {
  const anecdotes = store.getState();
  const { set: setAnecdote, ...anecdote } = useField("text");

  const handleNewAnecdote = event => {
    event.preventDefault();
    console.log("anecdote", event.target);
    const newAnecdote = event.target.anecdote.value;
    store.dispatch(add(newAnecdote));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name="anecdote" {...anecdote} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
