import React, { FC } from 'react';
import { useHeaderTitle } from 'shared/lib/HeaderTitle/useHeaderTitle';

export type Props = {};

export const HomePage: FC<Props> = () => {
  useHeaderTitle('Главная');

  return <div>Главная</div>;
};
