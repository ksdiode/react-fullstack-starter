import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { buildExtraReducers } from './util';

export const _getListThunk = createAsyncThunk(
  'blog/getListThunk',
  async (page, thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:4000/blog?_page=' + page);
      return res.data; // action의 payload가 됨
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: { totalCount: 120, posts: [], post: null },
  extraReducers: (builder) =>
    buildExtraReducers(builder, 'posts', _getListThunk),
});

export const useBlog = () => {
  const dispatch = useDispatch();
  return {
    getList: (page = 1) => dispatch(_getListThunk(page)),
  };
};

export default blogSlice.reducer;

// const writer = (i) => {
//   switch (i % 3) {
//     case 0:
//       return 'admin';
//     case 1:
//       return 'kim';
//     case 2:
//       return 'lee';
//   }
// };

// const posts = [];
// for (let i = 1; i < 120; i++) {
//   posts.push({
//     id: i,
//     title: `${i}번째 타이틀`,
//     writer: writer(i),
//     content: `${i}번째 포스트의 내용`,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });
// }
// console.log(posts);
