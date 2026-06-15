import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchArticles } from '../utils/api';

function Blogs() {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadArticles();
	}, []);

	const loadArticles = async () => {
		try {
			const response = await fetchArticles();
			setArticles(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <p>Loading blogs...</p>;
	}

	return (
		<div className='max-w-[800px] mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>
				All Blogs
			</h1>

			<div className='flex flex-col gap-6'>
				{articles.map((article) => (
					<Link
						key={article._id}
						to={`/blog/${article._id}`}
						className='border p-4 rounded-lg'
					>
						<h2 className='text-xl font-semibold'>
							{article.title}
						</h2>

						<p className='text-neutral-500 mt-2'>
							{article.description}
						</p>

						<p className='text-sm mt-2'>
							By {article.author}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Blogs;