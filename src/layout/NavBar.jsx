import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { HiOutlineSun, HiMenuAlt3 } from 'react-icons/hi';
import { menuItems } from '../utils/menuItems';

function NavBar() {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<nav className='w-full flex justify-between px-8 h-20 items-center bg-white border-1 border-neutral-400 rounded-lg'>
			<div className='w-10 h-10 rounded-lg '>
				<img
					src='/avater.jpg'
					alt='user photo'
					className=' w-full h-full aspect-auto rounded-lg object-contain'
				/>
			</div>
			<div className='flex items-center space-x-6'>
				<div
					className={`absolute top-20 -left-1/2 translate-x-1/2 w-screen py-10 bg-white shadow 
                    ${
											showMenu ? 'flex flex-col' : 'hidden md:block '
										} items-center gap-4 md:static md:shadow-none md:space-x-6 md:gap-0 md:top-0 md:-left-0 md:py-0 md:w-fit md:flex-row md:translate-x-0`}
				>
					{menuItems.map((links, index) => (
						<NavLink
							to={`/${
								links.name == 'home'
									? '.'
									: links.name == 'about'
									? '#about'
									: links.name == 'blog'
									? '#blog'
									: links.name
							}`}
							key={index}
						>
							{links.lable}
						</NavLink>
					))}
				</div>
				<div>
					<HiOutlineSun size={24} />
				</div>
				<div
					className=' md:hidden cursor-pointer'
					onClick={() => setShowMenu(!showMenu)}
				>
					<HiMenuAlt3 size={24} />
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
