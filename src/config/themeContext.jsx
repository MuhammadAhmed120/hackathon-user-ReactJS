import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);

    // CHECKING THEME
    useEffect(() => {
        const themeMode = localStorage.getItem('theme') || 'light';
        setTheme(themeMode === 'light');

        if (theme) {
            document.body.style.background = 'linear-gradient(to bottom right, #ffffff 10%, #d1d8ff 90%)';
            document.body.style.color = '#000000'; // Set text color for light mode
            document.documentElement.style.setProperty('--universal-text-color', '#000000');
        } else {
            document.body.style.background = 'linear-gradient(to bottom right, #4a5568 10%, #1a202c 90%)';
            document.body.style.color = '#ffffff'; // Set text color for light mode
            document.documentElement.style.setProperty('--universal-text-color', '#ffffff');
        }
    }, [theme]);

    // CHANGING THEME
    const toggleTheme = () => {
        const newTheme = !theme;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };