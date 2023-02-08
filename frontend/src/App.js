import { useEffect } from 'react';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/user/Login';
import Todo from './pages/Todo';
import { useUser } from './store/user';
import MyAppBar from './components/menu/MyAppBar';
import BlogList from './pages/blog/BlogList';
import Signup from './pages/user/Signup';
import MyPage from './pages/user/MyPage';

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/blog" element={<BlogList />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
