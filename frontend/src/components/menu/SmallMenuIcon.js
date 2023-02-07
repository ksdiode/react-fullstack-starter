import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function SmallMenuIcon({ openMenu }) {
  return (
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={openMenu}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
  );
}
export default SmallMenuIcon;
