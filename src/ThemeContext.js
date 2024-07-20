// src/ThemeContext.js
import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  const themeMode = useMemo(() => createTheme({
    palette: {
      mode: theme,
    },
  }), [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={themeMode}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProviderWrapper, ThemeContext };
