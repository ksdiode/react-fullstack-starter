import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const name = 'user';
const initialState = {
  isLogin: false,
  user: null,
};

const reducers = {
  _login(state, { payload: { userId, password } }) {
    if (userId && password === '1234') {
      state.isLogin = true;
      localStorage.setItem('userId', userId);
    }
  },

  _logout(state) {
    state.isLogin = false;
    localStorage.removeItem('userId');
  },

  _check(state) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      state.isLogin = true;
      state.user = userId;
    }
  },
};

const userSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const useUser = () => {
  const { _login, _logout, _check } = userSlice.actions;
  const dispatch = useDispatch();

  return {
    login: (userId, password) => dispatch(_login({ userId, password })),
    logout: () => dispatch(_logout()),
    loginCheck: () => dispatch(_check()),
  };
};

export default userSlice.reducer;
