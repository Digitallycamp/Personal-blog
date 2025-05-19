import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

export default function Profile() {
	return (
		<div className='flex flex-col space-y-6 px-6 pb-6'>
			<h1 className='mt-8 text-2xl font-bold'>Hi, I'm Wisdom ✋</h1>
			<div className='text-sm text-neutral-800 space-y-4'>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
					dignissimos delectus molestias explicabo quasi. Facere harum quibusdam
					ullam esse? Voluptatibus similique quos dolorem, nihil quod fugit aut
					accusamus laborum! Deleniti accusamus laborum! Deleniti accusamus
					laborum! Deleniti accusamus laborum! Deleniti
				</p>
				<p>
					Dignissimos delectus molestias explicabo quasi. Facere harum quibusdam
					ullam esse? Voluptatibus similique quos dolorem, nihil quod fugit aut
					accusamus laborum! Deleniti accusamus
				</p>
			</div>
			<div>
				<div className='flex space-x-4'>
					<FaXTwitter />
					<FaGithub />
					<FaLinkedinIn />
				</div>
			</div>
			<hr className='bg-neutral-700' />
		</div>
	);
}
