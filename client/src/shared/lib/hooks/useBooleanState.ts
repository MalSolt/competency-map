import { useState } from 'react';

export const useBooleanState = (defaultValue = false) => {
  const [state, setState] = useState(defaultValue);

  const setTrue = () => {
    setState(true);
  };
  const setFalse = () => {
    setState(false);
  };
  const toggle = () => {
    setState((s) => !s);
  };

  return {
    state,
    setTrue,
    setFalse,
    setState,
    toggle,
  };
};
