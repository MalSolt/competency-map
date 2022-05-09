import { useContext, useLayoutEffect } from 'react';
import { HeaderTitleContext } from './HeaderTitleProvider';

export const useHeaderTitle = (title = 'Default') => {
  const { setTitle } = useContext(HeaderTitleContext);
  useLayoutEffect(() => {
    setTitle(title);
  }, [title, setTitle]);
};
