import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUser } from '../../store/user';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function UserMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const user = useSelector((state) => state.user);
  const { logout } = useUser();

  return (
    <Box sx={{ flexGrow: 0 }}>
      {user.isLogin ? (
        <>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/images/2.jpg" />
            </IconButton>
          </Tooltip>
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton color="inherit" component={Link} to="/login">
            <LoginIcon />
          </IconButton>

          <IconButton color="inherit">
            <PersonAddIcon />
          </IconButton>
        </>
      )}

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserMenu;
