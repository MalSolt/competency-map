import React, { FC, useState } from 'react';

interface HeaderContext {
  title: string;
  setTitle: (title: string) => void;
}

export const HeaderTitleContext = React.createContext<HeaderContext>({
  title: 'Home',
  setTitle: () => {},
});

export const HeaderTitleProvider: FC = ({ children }) => {
  const [title, setTitle] = useState('Home');
  const value = { title, setTitle };
  return (
    <HeaderTitleContext.Provider value={value}>
      {children}
    </HeaderTitleContext.Provider>
  );
};
