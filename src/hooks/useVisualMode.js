import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (second, replace = false) => {
    setMode(second);
    const prevHistory = [...history];

    //When replace is true then set the history to reflect that we are replacing the current mode.
    if (replace === true) {
      prevHistory.pop();
      prevHistory.push(second);
      setHistory(prevHistory);
    } else {
      prevHistory.push(second);
      setHistory(prevHistory);
    }
  };

  //transition back to our previous mode.
  const back = () => {
    //should not allow the user to go back past the initial mode
    if (mode === initial) {
      setMode(initial);
      return;
    }
    const prevHistory = [...history];
    prevHistory.pop();
    const lastMode = prevHistory[prevHistory.length - 1];
    setHistory(prevHistory);
    setMode(lastMode);
  };

  return { mode, transition, back };
}
