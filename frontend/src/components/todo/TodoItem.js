import { Box, IconButton } from '@mui/material';
import { useTodo } from '../../store/todo';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TodoItem = ({ todo }) => {
  const { removeTodo, setTodo, setMode } = useTodo();

  const handleRemove = () => {
    // if (!confirm("삭제할까요?")) return;
    removeTodo(todo.id);
  };

  const handleCheck = (e) => {
    setTodo({ ...todo, done: e.target.checked });
  };

  const handleEdit = () => {
    setMode('edit', todo);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ mr: 1 }}>
        <input type="checkbox" onChange={handleCheck} checked={todo.done} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {todo.title} / {todo.done.toString()}
      </Box>

      <IconButton color="primary" onClick={handleEdit}>
        <EditIcon />
      </IconButton>

      <IconButton color="error" onClick={handleRemove}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default TodoItem;
