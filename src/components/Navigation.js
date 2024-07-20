// src/components/Navigation.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '../ThemeContext';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Box display="flex" alignItems="center">
          <Button component={Link} to="/table" color="inherit">Table</Button>
          <Button component={Link} to="/charts" color="inherit">Charts</Button>
          <Button component={Link} to="/calendar" color="inherit">Calendar</Button>
          <Button component={Link} to="/kanban" color="inherit">Kanban</Button>
          <IconButton edge="end" color="inherit" onClick={toggleTheme} style={{ marginLeft: '16px' }}>
            {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
