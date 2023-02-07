import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { buildExtraReducers } from './util';

const name = 'todo';

const initialState = {
  todos: [],
  max_id: 20,
  mode: 'add', // 'add' or 'edit'
  todo: { title: '', done: false },
};

const reducers = {
  _setTodo(state, { payload: todo }) {
    state.todos = state.todos.map((item) =>
      item.id === todo.id ? todo : item
    );
  },

  _addTodo(state, { payload: todo }) {
    todo.id = state.max_id;
    state.max_id++;
    state.todos.push(todo);
  },

  _removeTodo(state, { payload: id }) {
    state.todos = state.todos.filter((todo) => todo.id !== id);
  },

  _setMode(state, { payload: { mode, todo } }) {
    state.mode = mode;
    state.todo = todo;
  },
};

export const _getTodosThunk = createAsyncThunk(
  'todo/getTodosThunk',
  async (thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:4000/todos');
      return res.data; // action의 payload가 됨
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const todoSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: (builder) =>
    buildExtraReducers(builder, 'todos', _getTodosThunk),
});

export default todoSlice.reducer;

export const useTodo = () => {
  const { _setTodo, _addTodo, _removeTodo, _setMode } = todoSlice.actions;
  const dispatch = useDispatch();

  return {
    getTodos: () => dispatch(_getTodosThunk()),
    setTodo: (todo) => dispatch(_setTodo(todo)),
    addTodo: (todo) => dispatch(_addTodo(todo)),
    removeTodo: (id) => dispatch(_removeTodo(id)),
    setMode: (mode, todo) => dispatch(_setMode({ mode, todo })),
  };
};
