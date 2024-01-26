import { FigureList } from '@/features/figure';
import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';
import BoardList from '../../components/BoardList/BoardList';

const BoardListPage = (): ReactElement => {
  return (
    <Box component='section' paddingLeft={8} display='flex' flexDirection='column' gap={2}>
      <Typography variant='h4'>Meus Boards</Typography>
      <BoardList />

      <Typography variant='h4'>Minhas Miniaturas</Typography>
      <FigureList />
    </Box>
  );
};
export { BoardListPage };
