import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import UserMenu from './UserMenu';
import MainMenu from './MainMenu';

function MyAppBar() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          {/* 메인 메뉴 */}
          <MainMenu />
          {/* 우측 메뉴 */}
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MyAppBar;
