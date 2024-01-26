import { Box } from '@mui/material';
import { ReactElement } from 'react';
import { ActionMenu } from '../ActionMenu';
import { BoardCanvas } from '../BoardCanvas';

export const Board = (): ReactElement => {
  return (
    <Box position='relative'>
      <BoardCanvas />
      <ActionMenu />
    </Box>
  );
};
