import { stringToColor } from './stringToColor';

export const stringAvatar = (name: string) => ({
  sx: {
    bgcolor: stringToColor(name),
    cursor: 'pointer',
  },
  children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
});
