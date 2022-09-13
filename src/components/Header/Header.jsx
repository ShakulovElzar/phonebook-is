import React from 'react';
import {Link} from 'react-router-dom';
import Hamburger from 'hamburger-react';
import c from './Header.module.css';

const Header = ({ setPage, isMobile, isOpen, setOpen }) => {
	return (
		<header>
			{isMobile && (
				<div style={{ position: 'absolute', zIndex: 26 }}>
					<Hamburger
						toggled={isOpen}
						toggle={setOpen}
						hideOutline={false}
					/>
				</div>
			)}
			<Link
				to='/'
				className={c.link}
				onClick={() => {
					setPage(1);
					localStorage.setItem('page', 1);
				}}
			>
				<span className={c.phonebook}>ТЕЛЕФОННЫЙ СПРАВОЧНИК</span>
				<span className={c.phonebook__reporter}>
					МИНИСТЕРСТВА ФИНАНСОВ КЫРГЫЗСКОЙ РЕСПУБЛИКИ
				</span>
			</Link>
		</header>
	);
};

export default Header;
