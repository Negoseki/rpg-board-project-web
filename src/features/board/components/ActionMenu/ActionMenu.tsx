import { ArrowBackIos, SensorOccupied } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';
import { ActionMenuFigures } from '../ActionMenuFigures';

enum MenuOptions {
  FIGURES = 'FIGURES',
}

export const ActionMenu = (): ReactElement => {
  const [openMenu, setOpenMenu] = useState(false);
  const [currentOption, setCurrentOption] = useState<MenuOptions | null>(null);
  const isFullMenu = currentOption || openMenu;

  const handleOptionClick = (menuOption: MenuOptions) => {
    setCurrentOption(menuOption);
  };

  let contentDisplay = (
    <Button
      variant='contained'
      color='primary'
      onClick={handleOptionClick.bind(undefined, MenuOptions.FIGURES)}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 1,
      }}
    >
      <SensorOccupied />
      <Typography
        sx={{
          opacity: isFullMenu ? 1 : 0,
          transition: 'opacity 0.5s',
        }}
      >
        Miniaturas
      </Typography>
    </Button>
  );

  if (currentOption) {
    contentDisplay = <ActionMenuFigures />;
  }

  return (
    <Box
      onMouseEnter={() => setOpenMenu(true)}
      onMouseLeave={() => setOpenMenu(false)}
      position='fixed'
      top='20vh'
      maxWidth={isFullMenu ? '200px' : '58px'}
      width='fit-content'
      height='60vh'
      overflow='hidden'
      bgcolor='white'
      padding={1}
      display='flex'
      flexDirection='column'
      gap={1}
      sx={{
        border: 1,
        borderColor: 'primary.main',
        borderLeft: 0,
        borderTopRight: 2,
        borderBottomRight: 2,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        transition: 'max-width 0.5s',
        minWidth: 0,
      }}
    >
      {currentOption && (
        <Box>
          <IconButton edge='end' color='primary' onClick={setCurrentOption.bind(undefined, null)}>
            <ArrowBackIos />
          </IconButton>
        </Box>
      )}
      {contentDisplay}
    </Box>
  );
};
