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
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import useInput from '../../hooks/input';
import { useUser } from '../../store/user';

const Signup = () => {
  const [userIdProps] = useInput('');
  const [passwordProps] = useInput('');
  const [confirmPpasswordProps] = useInput('');
  const { signup } = useUser();
  const navigate = useNavigate();

  async function handleSignup() {
    if (!userIdProps.value) return alert('사용자 Id를 입력하세요.');
    if (!passwordProps.value) return alert('비밀번호를 입력하세요.');
    if (!confirmPpasswordProps.value)
      return alert('비밀번호 확인을 입력하세요.');
    if (passwordProps.value !== confirmPpasswordProps.value) {
      return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }
    const { payload: res } = await signup(
      userIdProps.value,
      passwordProps.value
    );
    console.log('------------->', res);
    if (res.result === 'ok') {
      // navigate('/');
    }
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
          <PersonAddIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          회원가입
        </Typography>

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
            label="비밀번호"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            {...confirmPpasswordProps}
            margin="normal"
            fullWidth
            label="비밀번화 확인"
            type="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<PersonAddIcon />}
            onClick={handleSignup}
          >
            가입
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
