import React from "react";
import { vote } from "./reducers/anecdoteReducer";
import { AnecdoteForm } from "./App/AnecdoteForm";

const App = ({ store }) => {
  const anecdotes = store.getState();

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
      <AnecdoteForm store={store} />
    </div>
  );
};

export default App;
