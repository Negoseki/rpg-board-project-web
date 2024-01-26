import { Add } from '@mui/icons-material';
import { Box, Card, CardContent, Link, Skeleton } from '@mui/material';
import { ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetBoardsQuery } from '../../api/board.api';
import { BoardForm } from '../BoardForm';
import { BoardListCard } from '../BoardListCard/BoardListCard';

const BoardList = (): ReactElement => {
  const [openNewBoard, setOpenNewBoard] = useState(false);
  const { data: boards = [], isLoading } = useGetBoardsQuery();

  const handleOnNewBoard = () => {
    setOpenNewBoard(true);
  };

  return (
    <>
      <BoardForm open={openNewBoard} onClose={() => setOpenNewBoard(false)} />
      <Box display='flex' gap='16px' flexWrap='wrap'>
        {isLoading &&
          [1, 2, 3].map((v) => (
            <Card key={v} sx={{ width: 320 }}>
              <Skeleton variant='rectangular' animation='wave' sx={{ height: 140 }} />
              <CardContent>
                <Skeleton animation='wave' height={40} width='40%' />
              </CardContent>
            </Card>
          ))}

        <BoardListCard
          title='Novo Board'
          icon={<Add fontSize='large' />}
          onClick={handleOnNewBoard}
        ></BoardListCard>

        {!isLoading &&
          boards.map((item) => (
            <Link sx={{ textDecoration: 'none' }} component={RouterLink} key={item.id} to={item.id}>
              <BoardListCard
                title={item.name}
                image={
                  'https://cdn.leonardo.ai/users/5d4c8ed8-153b-4d49-9356-b49c4a7c6cfa/generations/5a9d9cce-6708-4928-a988-ed3df7eb6b29/RPG_40_Transform_your_tabletop_RPG_experience_with_our_visuall_2.jpg'
                }
              />
            </Link>
          ))}
      </Box>
    </>
  );
};

export default BoardList;
