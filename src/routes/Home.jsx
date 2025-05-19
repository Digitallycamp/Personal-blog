import React from 'react';
import Profile from '../layout/Profile';
import LatestArticles from '../layout/LatestArticles';

function Home() {
	return (
		<div className='w-full max-w-[660px] mx-auto border-x border-x-neutral-400'>
			<Profile />
			<LatestArticles />
		</div>
	);
}

export default Home;
