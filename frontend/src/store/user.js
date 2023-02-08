import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { buildExtraReducers } from './util';

const name = 'user';
const initialState = {
  user: null,
};

export const _loginThunk = createAsyncThunk(
  'user/loginThunk',
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/auth/login', body); // isLogin, userId, token
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.reason)
        return thunkAPI.rejectWithValue(error.response.data.reason);
      else return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const reducers = {
  _logout(state) {
    localStorage.removeItem('user');
    state.user = null;
  },

  _check(state) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      state.user = user;
    }
  },
};

const userSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: (builder) => buildExtraReducers(builder, 'user', _loginThunk),
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
