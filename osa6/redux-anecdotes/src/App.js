import React from "react";
import AnecdoteForm from "./App/AnecdoteForm";
import AnecdoteList from "./App/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
