import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchArticles } from '../utils/api';

function LatestArticles() {
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
		return <p>Loading articles...</p>;
	}

	return (
		<div className='flex flex-col px-6 pb-6'>
			<h2 className='flex items-end gap-2 text-2xl font-bold mb-8'>
				Latest Articles
				<span className='w-10 h-1 bg-blue-500 block'></span>
			</h2>

			<section>
				<article className='flex flex-col space-y-4'>
					{articles.map((article) => (
						<Link
							key={article._id}
							to={`/blog/${article._id}`}
						>
							<h3>{article.title}</h3>

							<span className='italic text-neutral-500'>
								{new Date(
									article.createdAt
								).toLocaleString()}
							</span>
						</Link>
					))}
				</article>
			</section>
		</div>
	);
}

export default LatestArticles;