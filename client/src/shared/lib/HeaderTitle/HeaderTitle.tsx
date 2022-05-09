import { FC, useContext } from 'react';
import { HeaderTitleContext } from './HeaderTitleProvider';

export const HeaderTitle: FC = () => {
  const { title } = useContext(HeaderTitleContext);
  return <>{title}</>;
};
