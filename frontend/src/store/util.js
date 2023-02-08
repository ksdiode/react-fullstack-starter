import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export async function asyncTimeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('timeout');
    }, delay);
  });
}

export function buildExtraReducers(builder, asyncAction, field = undefined) {
  builder
    .addCase(asyncAction.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(asyncAction.fulfilled, (state, action) => {
      state.loading = false;

      if (field && typeof field === 'string') state[field] = action.payload;
      else if (field) field(state, action.payload);
    })
    .addCase(asyncAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}

export function createThunk(type, fn) {
  return createAsyncThunk(type, async (body, thunkAPI) => {
    try {
      const { data } = fn(body);

      return data;
    } catch (error) {
      const message = error.response.data ? error.response.data : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  });
}
