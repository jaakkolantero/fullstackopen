import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const action = type => {
    switch (type) {
      case "GOOD":
        store.dispatch({
          type
        });
        break;
      case "OK":
        store.dispatch({
          type
        });
        break;
      case "BAD":
        store.dispatch({
          type
        });
        break;
      case "ZERO":
        store.dispatch({
          type
        });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <button onClick={() => action("GOOD")}>hyvä</button>
      <button onClick={() => action("OK")}>neutraali</button>
      <button onClick={() => action("BAD")}>huono</button>
      <button onClick={() => action("ZERO")}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
