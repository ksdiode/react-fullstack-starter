import * as React from 'react';
import Menu from '@mui/material/Menu';
import SmallMenuItems from './SmallMenuItems';
import SmallMenuIcon from './SmallMenuIcon';
import { Box } from '@mui/material';

function SmallMenu({ pages }) {
  const [anchor, setAnchorElNav] = React.useState(null);
  const openMenu = (event) => setAnchorElNav(event.currentTarget);
  const closeMenu = () => setAnchorElNav(null);

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <SmallMenuIcon openMenu={openMenu} />
      <Menu
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchor)}
        onClose={closeMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <SmallMenuItems pages={pages} closeMenu={closeMenu} />
      </Menu>
    </Box>
  );
}
export default SmallMenu;
