import { FC, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';

type MenuOptionType = {
  key: string;
  title: string;
  onClick: () => void;
};

type Props = {
  options: MenuOptionType[];
};

export const MenuOnButton: FC<Props> = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} data-testid="menuonbutton-button">
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClick={handleCloseMenu}
        onClose={handleCloseMenu}
        data-testid="menuonbutton-menu"
      >
        {options.map((option: MenuOptionType) => (
          <MenuItem key={option.key} onClick={option.onClick}>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
