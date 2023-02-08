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
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import useInput from '../../hooks/input';
import { useUser } from '../../store/user';

const Login = () => {
  const [userIdProps] = useInput('lee');
  const [passwordProps] = useInput('1234');

  const navigate = useNavigate();

  const { user, error } = useSelector((state) => state.user);
  const { login } = useUser();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  async function handleLogin() {
    if (!userIdProps.value) return alert('userId를 입력하세요');
    if (!passwordProps.value) return alert('비밀번호를 입력하세요');
    login(userIdProps.value, passwordProps.value);
  }

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

        {error && (
          <Typography color="error" sx={{ my: 3 }}>
            {error}
          </Typography>
        )}

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            {...userIdProps}
            margin="normal"
            fullWidth
            label="user Id"
            autoFocus
          />

          <TextField
            {...passwordProps}
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<LoginIcon />}
            onClick={handleLogin}
          >
            로그인
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
