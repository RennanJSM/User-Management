import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color='primary'>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={() => window.location.href = '/'}
        >
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
