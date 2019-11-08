import React from "react";
import { AnecdoteForm } from "./App/AnecdoteForm";
import { AnecdoteList } from "./App/AnecdoteList";
import Notification from "./components/Notification";

const App = ({ store }) => {
  return (
    <div>
      <Notification store={store} />
      <h2>Anecdotes</h2>
      <AnecdoteList store={store} />
      <h2>create new</h2>
      <AnecdoteForm store={store} />
    </div>
  );
};

export default App;
