import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { buildExtraReducers } from './util';
import jwt_decode from 'jwt-decode';

const name = 'user';
const initialState = {
  userId: null,
  token: null,
};

export const _loginThunk = createAsyncThunk(
  'user/loginThunk',
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/auth/login', body); // isLogin, userId, token
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.reason)
        return thunkAPI.rejectWithValue(error.response.data.reason);
      else return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const _signupThunk = createAsyncThunk(
  'user/signupThunk',
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/auth/signup', body); // isLogin, userId, token
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
    console.log('logout');
    localStorage.removeItem('user');
    state.userId = null;
    state.token = null;
  },

  _check(state) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const token = jwt_decode(user.token);
      state.userId = user.userId;
      state.token = user.token;
    }
  },
};

const userSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: (builder) => {
    buildExtraReducers(builder, 'user', _loginThunk, (state, payload) => {
      localStorage.setItem('user', JSON.stringify(payload));
      state.userId = payload.userId;
      state.token = payload.token;
    });
    buildExtraReducers(builder, '', _signupThunk);
  },
});

export const useUser = () => {
  const { _logout, _check } = userSlice.actions;
  const dispatch = useDispatch();

  return {
    login: async (userId, password) =>
      dispatch(_loginThunk({ userId, password })),
    signup: async (userId, password) =>
      dispatch(_signupThunk({ userId, password })),
    logout: () => dispatch(_logout()),
    loginCheck: () => dispatch(_check()),
  };
};

export default userSlice.reducer;
