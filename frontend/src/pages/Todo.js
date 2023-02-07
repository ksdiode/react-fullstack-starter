import { Box, CircularProgress, Container } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TodoInput from '../components/todo/TodoInput';
import TodoList from '../components/todo/TodoList';
import { useTodo } from '../store/todo';

const Todo = () => {
  const { todos, loading } = useSelector((state) => state.todo);
  const { getTodos } = useTodo();
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Container>
      <h2>Todo {loading && <CircularProgress />}</h2>
      <TodoInput />
      <Box sx={{ mt: 3 }}>
        <TodoList todos={todos} />
      </Box>
    </Container>
  );
};

export default Todo;
