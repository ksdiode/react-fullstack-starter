import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IconButton, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useInput from '../../hooks/input';
import { useTodo } from '../../store/todo';

const TodoInput = () => {
  const { mode, todo } = useSelector((state) => state.todo);
  const { addTodo, setTodo, setMode } = useTodo();
  const todoRef = useRef();
  const [todoProps, resetTodo] = useInput();

  useEffect(() => {
    if (mode === 'add') {
      resetTodo();
    } else if (mode === 'edit') {
      resetTodo(todo.title);
    }
  }, [mode, todo]);

  const handleSave = () => {
    if (mode === 'add') {
      addTodo({
        title: todoProps.value,
        done: false,
      });
    }
    if (mode === 'edit') {
      setTodo({
        ...todo,
        title: todoProps.value,
      });
    }
    setMode('add', {});
    todoRef.current.focus();
  };

  const handleReset = () => {
    resetTodo();
    setMode('add', {});
  };

  return (
    <div style={{ display: 'flex' }}>
      <TextField
        inputRef={todoRef}
        {...todoProps}
        label={mode === 'add' ? '새로운 할 일' : '할 일'}
        variant="standard"
        sx={{ flexGrow: 1 }}
      />
      <IconButton onClick={handleSave}>
        {mode === 'add' ? <AddCircleOutlineIcon /> : <BorderColorIcon />}
      </IconButton>
      <IconButton onClick={handleReset}>
        <RestartAltIcon />
      </IconButton>
    </div>
  );
};

export default TodoInput;
