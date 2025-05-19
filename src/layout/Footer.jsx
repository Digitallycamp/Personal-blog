import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
	return (
		<footer className='w-full h-20 flex justify-between  items-center bg-white px-8 border-1 border-neutral-400 rounded-lg'>
			<div>
				<p>Made with ❤️ love ☕</p>
			</div>
			<div className='flex space-x-4'>
				<FaXTwitter />
				<FaGithub />
				<FaLinkedinIn />
			</div>
		</footer>
	);
}

export default Footer;
