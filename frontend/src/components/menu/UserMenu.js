import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUser } from '../../store/user';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function UserMenu() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { logout } = useUser();
  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      {user.userId ? (
        <>
          <IconButton onClick={() => navigate('/mypage')} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/images/2.jpg" />
            <Typography component="p" color="white" sx={{ ml: 1 }}>
              {user.userId}
            </Typography>
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton color="inherit" component={Link} to="/login">
            <LoginIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/signup">
            <PersonAddIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
}

export default UserMenu;
