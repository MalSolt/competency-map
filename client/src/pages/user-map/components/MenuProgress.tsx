import { FC, useState } from 'react';
import { UserCompetencyStatus } from '@dto/userCompetency';
import { CompetencyId, UserId } from '@kernel';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { useUpdateUserCompetency } from 'controllers/user-competencies';
import {
  USER_COMPETENCY_STATUES,
  USER_COMPETENCY_STATUES_LIST,
} from 'pages/user-map/constants';
import EditIcon from '@mui/icons-material/Edit';
import { useAppAbility } from 'shared/lib/ablity/abilityContext';

type Props = {
  competencyId: CompetencyId;
  userId: UserId;
  userInfoStatus: UserCompetencyStatus;
};

export const MenuProgress: FC<Props> = ({
  competencyId,
  userId,
  userInfoStatus,
}) => {
  const appAbility = useAppAbility();
  const [progress, setProgress] =
    useState<UserCompetencyStatus>(userInfoStatus);
  const userCompetencyUpdateMutation = useUpdateUserCompetency();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClose = (event: any) => {
    setAnchorEl(null);

    if (!userId) {
      return;
    }

    const status = event.currentTarget.dataset.value as UserCompetencyStatus;

    userCompetencyUpdateMutation.mutate({
      competencyId,
      userId,
      status,
    });
    setProgress(status);
  };
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleButtonClick}
        color="default"
        size="small"
      >
        <EditIcon />
      </IconButton>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {USER_COMPETENCY_STATUES_LIST.filter((value: UserCompetencyStatus) =>
          appAbility.can(`update-status-${value}`, 'UserCompetency')
        ).map((value: UserCompetencyStatus) => (
          <MenuItem
            key={value}
            data-value={value}
            disabled={progress === value}
            onClick={handleMenuClose}
          >
            {USER_COMPETENCY_STATUES[value]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
