import { Box } from '@mui/material';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBoardQuery } from '../../api/board.api';
import { Board } from '../../components/Board';

const BoardPage = (): ReactElement => {
  const { boardId: id } = useParams();
  if (!id) {
    return <div>Tabuleiro não encontrado</div>;
  }

  const { data: board, isLoading } = useGetBoardQuery({ id });

  if (isLoading) {
    return <div> Carregando...</div>;
  }

  if (!board || !id) {
    return <div>Tabuleiro não encontrado</div>;
  }

  return (
    <Box component='section'>
      <Board />
    </Box>
  );
};

export default BoardPage;
