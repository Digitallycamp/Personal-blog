import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import App from './App.jsx';
import Home from './routes/Home.jsx';
import NewsLetter from './routes/NewsLetter.jsx';
import NavBar from './layout/NavBar.jsx';
import Footer from './layout/Footer.jsx';
import Blog from './routes/Blog.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route index element={<Home />} />
				<Route path='blog/:blogId' element={<Blog />} />
				<Route path='newsletter' element={<NewsLetter />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	</StrictMode>
);
