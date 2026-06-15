import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchArticle } from '../utils/api';

function Blog() {
	const { blogId } = useParams();
	const navigate = useNavigate();

	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadArticle();
	}, [blogId]);

	const loadArticle = async () => {
		try {
			const response = await fetchArticle(blogId);
			setArticle(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleBack = () => {
		navigate('/');
	};

	if (loading) {
		return <p>Loading article...</p>;
	}

	if (!article) {
		return <p>Article not found.</p>;
	}

	return (
		<div className='max-w-[800px] mx-auto p-6'>
			<button
				onClick={handleBack}
				className='mb-6 text-2xl'
			>
				<IoIosArrowBack />
			</button>

			<h1 className='text-3xl font-bold mb-3'>
				{article.title}
			</h1>

			<p className='text-neutral-500 mb-2'>
				By {article.author}
			</p>

			<p className='text-neutral-500 mb-6'>
				{new Date(article.createdAt).toLocaleString()}
			</p>

			<p className='font-semibold mb-4'>
				{article.description}
			</p>

			<div>
				{article.content}
			</div>
		</div>
	);
}

export default Blog;