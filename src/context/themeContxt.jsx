import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(
		localStorage.getItem('darkmode') === true
	);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('darkMode', darkMode);
	});
	return (
		<ThemeContext.Provider
			value={{ darkMode, setDarkMode }}
		></ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
