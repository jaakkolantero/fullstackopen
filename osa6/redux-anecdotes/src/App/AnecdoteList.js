import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteList = ({ anecdotes, vote, notify }) => {
  const handleVote = anecdote => {
    vote(anecdote);
    notify(`voted ${anecdote.content}!`, 2);
    //TODO: debounce to make it work with multiple votes
  };
  return (
    <div>
      {anecdotes.map(anecdote => (
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

const filterAndSortAnecdotes = ({ anecdotes, filter }) =>
  anecdotes
    .filter(anecdote =>
      filter
        ? anecdote.content.toLowerCase().includes(filter.toLowerCase())
        : anecdote
    )
    .sort((a, b) => (a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0));

const mapStateToProps = state => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    anecdotes: filterAndSortAnecdotes(state)
  };
};

const mapDispatchToProps = {
  vote,
  notify
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
