import { FC } from 'react';
// import styles from './Header.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material';

export const Header: FC = () => {
  const { user } = useAuth0();
  return (
    <header>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant='h5'>RPG Board</Typography>
          <Box flexGrow={1} />
          <Box alignItems='center' display='flex' gap='8px'>
            <Typography variant='h6'>{user?.nickname}</Typography>
            <Avatar src={user && user.picture} alt={user?.nickname} />
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};
