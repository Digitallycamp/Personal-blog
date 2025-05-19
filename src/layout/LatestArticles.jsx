import React from 'react';
import { Link } from 'react-router';
import { articles } from '.././utils/data';
function LatestArticles() {
	return (
		<div className='flex flex-col  px-6 pb-6'>
			<h2 className='flex items-end gap-2 text-2xl font-bold mb-8'>
				Latest Articles <span className='w-10 h-1 bg-blue-500 block'></span>
			</h2>

			<section>
				<article className='flex flex-col space-y-4'>
					{articles.map((article) => (
						<Link key={article.id} to={`/blog/${article.id}`}>
							<h3>{article.title}</h3>
							<span className=' italic text-neutral-500 '>
								{article.createdAt.toLocaleString()}
							</span>
						</Link>
					))}
					<Link className='border-b-4 border-b-blue-500 w-fit'>
						View all articles
					</Link>
				</article>
			</section>
		</div>
	);
}

export default LatestArticles;
