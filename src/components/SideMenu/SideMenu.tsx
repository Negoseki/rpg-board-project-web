import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { ReactElement, useState } from 'react';

type MenuAction = {
  text: string;
  icon: ReactElement;
};
type SideMenuProps = {
  actions: MenuAction[];
};

export const SideMenu = ({ actions = [] }: SideMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      component='nav'
      variant='permanent'
      open={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Toolbar />

      <List disablePadding>
        {actions.map((action) => (
          <ListItemButton key={action.text}>
            <ListItemIcon sx={{ minWidth: 'auto' }}>{action.icon}</ListItemIcon>
            <Collapse in={open} orientation='horizontal' sx={{ whiteSpace: 'nowrap' }}>
              <ListItemText sx={{ paddingLeft: '32px' }} primary={action.text} />
            </Collapse>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
