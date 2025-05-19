import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { IoIosArrowBack } from 'react-icons/io';

function Blog() {
	const param = useParams();
	let navigate = useNavigate();

	const handleBack = () => {
		navigate('/');
	};
	return (
		<div>
			<button onClick={handleBack}>
				<IoIosArrowBack />
			</button>
			<p>
				{param.blogId}
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
				maiores nesciunt facere obcaecati possimus rem recusandae quis nam
				perspiciatis velit!
			</p>
		</div>
	);
}

export default Blog;
