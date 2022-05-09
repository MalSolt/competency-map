import { useEffect, useReducer } from 'react';
import { SafeJSON } from 'shared/utils/SafeJSON';
import { MapState } from '../model/MapState';
import { mapStateReducer } from '../model/mapStateReducer';

const initialState: MapState = {
  container: {
    width: 0,
    height: 0,
    offset: { i: 0, j: 0 },
  },
  move: { i: 0, j: 0 },
  scale: 1,
  size: 5000,
};

export const useMap = (localStorageKey: string) => {
  const [state, dispatch] = useReducer(
    mapStateReducer,
    localStorageKey,
    (key) => SafeJSON.parse(localStorage.getItem(key), initialState)
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, localStorageKey]);

  return [state, dispatch] as const;
};
