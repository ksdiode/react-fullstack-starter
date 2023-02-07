import * as React from 'react';
import { Link } from 'react-router-dom';

import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

function SmallMainMenuItems({ pages, closeMenu }) {
  return (
    <>
      {pages.map((page) => (
        <MenuItem
          key={page.title}
          onClick={closeMenu}
          component={Link}
          to={page.to}
        >
          <ListItemIcon>{page.icon}</ListItemIcon>
          <ListItemText>{page.title}</ListItemText>
        </MenuItem>
      ))}
    </>
  );
}
export default SmallMainMenuItems;
