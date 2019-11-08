import React from "react";
import { AnecdoteForm } from "./App/AnecdoteForm";
import { AnecdoteList } from "./App/AnecdoteList";

const App = ({ store }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={store} />
      <h2>create new</h2>
      <AnecdoteForm store={store} />
    </div>
  );
};

export default App;
