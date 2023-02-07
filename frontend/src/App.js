import { useEffect } from 'react';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Todo from './pages/Todo';
import { useUser } from './store/user';
import MyAppBar from './components/menu/MyAppBar';
import BlogList from './pages/blog/BlogList';

function App() {
  const { loginCheck } = useUser();

  useEffect(() => {
    loginCheck();
  }, [loginCheck]);

  return (
    <div className="App">
      <MyAppBar />
      <Container>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/blog" element={<BlogList />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
