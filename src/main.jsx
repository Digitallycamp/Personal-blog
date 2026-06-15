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
import BlogListing from './pages/BlogListing.jsx';
import BlogPost from './pages/BlogPost';
import CategoryPage from './pages/CategoryPage';
import ArticleList from './pages/admin/ArticleList';
import ArticleForm from './pages/admin/ArticleForm';


createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route index element={<Home />} />
				{/* <Route path='blog/:blogId' element={<Blog />} /> */}
				<Route path='newsletter' element={<NewsLetter />} />
				        <Route path="/" element={<BlogListing />} />
                        <Route path="/blog" element={<BlogListing />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/category/:categoryId" element={<CategoryPage />} />
                        <Route path="/admin/articles" element={<ArticleList />} />
                        <Route path="/admin/articles/create" element={<ArticleForm />} />
                        <Route path="/admin/articles/edit/:id" element={<ArticleForm />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	</StrictMode>
);
