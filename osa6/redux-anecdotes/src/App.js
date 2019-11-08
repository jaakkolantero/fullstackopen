import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { init } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./App/AnecdoteForm";
import AnecdoteList from "./App/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = ({ init }) => {
  useEffect(() => {
    init();
  });
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

export default connect(
  null,
  { init }
)(App);
