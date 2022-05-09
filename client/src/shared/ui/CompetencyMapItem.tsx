import React, {
  CSSProperties,
  FC,
  ReactNode,
  Ref,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CompetencyDto, CompetencyWithUserDto } from '@dto/competency';
import { CompetencyId } from '@kernel';
import { UpdateMapItemSizes } from 'widgets/map-content/types';
import { generateImagesUrl } from 'shared/lib/generateImagesUrl';

export interface BoxProps {
  withoutToolbar?: boolean;
  competency: CompetencyDto &
    Pick<Partial<CompetencyWithUserDto>, 'userCompetencyInfo'>;
  style?: CSSProperties;
  cardRef?: Ref<HTMLDivElement>;
  updateMapItemSizes?: UpdateMapItemSizes<CompetencyId>;
  toolbar?: ReactNode;
  readonly?: boolean;
  color?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

export const CompetencyMapItemSize: Sizes = {
  width: 0,
  height: 0,
};

export const CompetencyMapItem: FC<BoxProps> = ({
  withoutToolbar,
  competency,
  style,
  cardRef,
  updateMapItemSizes,
  readonly,
  toolbar,
  color,
  onClick,
  onDoubleClick,
}) => {
  const { boxRef } = useCompetencyMapItemSizes(updateMapItemSizes, competency);

  return (
    <Box
      ref={boxRef}
      sx={{
        display: 'inline-block',
        ...style,
        cursor: readonly ? 'default' : 'move',
        wordBreak: 'break-word',
      }}
    >
      <Card
        ref={cardRef}
        sx={{ ...getStyles(color) }}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        {competency.image?.imageName && (
          <Avatar
            alt="Avatar"
            src={generateImagesUrl(competency.image?.imageName)}
            sx={{ width: 38, height: 38, mr: 1 }}
          />
        )}
        <Typography
          variant="h5"
          component="div"
          sx={{ ml: '5px', whiteSpace: 'pre' }}
        >
          {competency.title}
        </Typography>
      </Card>
      {!withoutToolbar && toolbar && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: 'translateY(-100%)',
          }}
        >
          {toolbar}
        </Box>
      )}
    </Box>
  );
};

const getStyles = (background: string | undefined): CSSProperties => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: 2,
  padding: '0.5em',
  border: '1px solid gray',
  background,
});

const useCompetencyMapItemSizes = (
  updateMapItemSizes: UpdateMapItemSizes<CompetencyId> | undefined,
  competency: CompetencyDto &
    Pick<Partial<CompetencyWithUserDto>, 'userCompetencyInfo'>
) => {
  const MAX_WIDTH = 420;

  const [sizes, setSizes] = useState<Sizes>(CompetencyMapItemSize);
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const width = boxRef.current?.offsetWidth;
    const height = boxRef.current?.offsetHeight;

    if (!width || !height) {
      return;
    }

    const s = {
      height,
      width: width < MAX_WIDTH ? width : MAX_WIDTH,
    };

    setSizes({ ...s });

    if (updateMapItemSizes) {
      updateMapItemSizes({ ...s, id: competency.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competency]);

  return { sizes, boxRef };
};
