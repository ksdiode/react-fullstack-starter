import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const name = 'user';
const initialState = {
  isLogin: false,
  user: null,
};

export const _loginThunk = createAsyncThunk(
  'user/loginThunk',
  async (body, thunkAPI) => {
    try {
      const res = await axios.post('/api/login', body);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
  const { _logout, _check } = userSlice.actions;
  const dispatch = useDispatch();

  return {
    login: (userId, password) => dispatch(_loginThunk({ userId, password })),
    logout: () => dispatch(_logout()),
    loginCheck: () => dispatch(_check()),
  };
};

export default userSlice.reducer;
