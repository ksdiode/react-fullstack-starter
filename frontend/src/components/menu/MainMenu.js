import * as React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import BookIcon from '@mui/icons-material/Book';

import MainMenuItems from './MainMenuItems';
import SmallMenu from './SmallMenu';

const pages = [
  { title: 'Home', to: '/', icon: <HomeIcon fontSize="small" /> },
  {
    title: 'Todo',
    to: '/todo',
    icon: <PlaylistAddCheckIcon fontSize="small" />,
  },
  { title: 'Blog', to: '/blog', icon: <BookIcon fontSize="small" /> },
];

function MainMenu() {
  return (
    <>
      {/* 큰 화면 메뉴 */}
      <MainMenuItems pages={pages} />

      {/* 작은 화면 메뉴 */}
      <SmallMenu pages={pages} />
    </>
  );
}
export default MainMenu;
