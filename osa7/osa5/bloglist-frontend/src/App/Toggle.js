import React, { useState } from "react";
import propTypes from "prop-types";

const Toggle = ({ showText, hideText, children }) => {
  const [show, setShow] = useState(false);
  const toggle = () => (show ? setShow(false) : setShow(true));

  return (
    <div>
      <button
        className="inline-block ml-3 mb-1 rounded-sm px-2 py-1 overflow-hidden bg-blue-200 hover:bg-blue-500 border border-gray-700"
        onClick={() => toggle()}
      >
        {show ? hideText : showText}
      </button>
      {show ? children : null}
    </div>
  );
};

Toggle.propTypes = {
  showText: propTypes.string.isRequired,
  hideText: propTypes.string.isRequired,
  children: propTypes.node.isRequired
};

export default Toggle;
