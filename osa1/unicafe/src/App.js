import React, { useReducer } from "react";
import Statistics from "./App/Statistics";
import Button from "./App/Button";

function App() {
  const [good, incrementGood] = useReducer(c => c + 1, 0);
  const [neutral, incrementNeutral] = useReducer(c => c + 1, 0);
  const [bad, incrementBad] = useReducer(c => c + 1, 0);

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood}>good</Button>
      <Button handleClick={incrementNeutral}>neutral</Button>
      <Button handleClick={incrementBad}>bad</Button>
      <h1>statistics</h1>
      <Statistics stats={[good, neutral, bad]} />
    </>
  );
}

export default App;
