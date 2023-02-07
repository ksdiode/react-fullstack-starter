import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';

import useInput from '../hooks/input';
import { useUser } from '../store/user';

const Login = () => {
  const [userIdProps] = useInput('');
  const [passwordProps] = useInput('');

  const navigate = useNavigate();

  const { isLogin } = useSelector((state) => state.user);
  const { login } = useUser();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          로그인
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            {...userIdProps}
            margin="normal"
            required
            fullWidth
            id="userId"
            label="user Id"
            name="userId"
            autoFocus
          />

          <TextField
            {...passwordProps}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<LoginIcon />}
            onClick={() => login(userIdProps.value, passwordProps.value)}
          >
            로그인
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
