import { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider as Provider } from 'react-dnd';

export const DndProvider: FC = ({ children }) => (
  <Provider backend={HTML5Backend}>{children}</Provider>
);
