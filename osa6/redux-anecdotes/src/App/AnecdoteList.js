import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  resetNotification
} from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteList = ({
  anecdotes,
  filter,
  vote,
  setNotification,
  resetNotification
}) => {
  const handleVote = anecdote => {
    vote(anecdote.id);
    setNotification(`voted ${anecdote.content}!`);
    setTimeout(() => {
      resetNotification();
    }, 5000);
    //TODO: debounce to make it work with multiple votes
  };
  return (
    <div>
      {anecdotes
        .filter(anecdote =>
          filter
            ? anecdote.content.toLowerCase().includes(filter.toLowerCase())
            : anecdote
        )
        .sort((a, b) => (a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0))
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = state => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  vote,
  setNotification,
  resetNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
