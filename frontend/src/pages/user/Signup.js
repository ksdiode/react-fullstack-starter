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
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import useInput from '../../hooks/input';
import { useUser } from '../../store/user';

const Signup = () => {
  const [userIdProps] = useInput('');
  const [passwordProps] = useInput('');
  const [confirmPpasswordProps] = useInput('');

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
          <PersonAddIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          회원가입
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
            label="비밀번호"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            {...confirmPpasswordProps}
            margin="normal"
            required
            fullWidth
            label="비밀번화 확인"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<PersonAddIcon />}
          >
            가입
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
