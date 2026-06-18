import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import Layout from './layout/Layout.jsx';
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
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}


ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
		<BrowserRouter>
		    <AuthProvider>
			
			<Routes>
              
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="newsletter" element={<NewsLetter />} />
                <Route path="/blog" element={<BlogListing />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                
                <Route path="/admin/articles" element={
                  <ProtectedRoute> <ArticleList /> </ProtectedRoute>
                } />
                <Route path="/admin/articles/create" element={
                  <ProtectedRoute> <ArticleForm /> </ProtectedRoute>
                } />
                <Route path="/admin/articles/edit/:id" element={
                  <ProtectedRoute> <ArticleForm /> </ProtectedRoute>
                } />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

            </Routes>
			
			</AuthProvider>
		</BrowserRouter>
		</GoogleOAuthProvider>
	</StrictMode>
);
