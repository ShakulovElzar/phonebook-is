import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './styles/App.css';
import './styles/normalize.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileNavbar from './components/Navbar/MobileNavbar';
import {AdminContext, AuthContext, RoleContext} from './context/';
import Error from './pages/Error';
import axios from 'axios';

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [hasRole, setHasRole] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const isMobile = useMediaQuery('(max-width: 760px)');
	const [isOpen, setOpen] = useState(false);

	// internet connection check
	let onlineBoolean = navigator.onLine;

	const roleCheck = () => {
		axios
			.get('http://10.200.24.103:8089/account/', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('atoken')}`,
				},
			})
			.then((resp) => {
				for (let i = 0; i < resp.data.length; i++) {
					if (resp.data[i].email === localStorage.getItem('user')) {
						if (resp.data[i].is_staff) {
							setIsAdmin(true);
						}
						// role check
						setHasRole(resp.data[i].role);
					}
				}
			});
	};

	useEffect(() => {
		const d = new Date();
		if (
			JSON.stringify(d.getTime()) <= localStorage.getItem('loginExpiry')
		) {
			setIsAuth(true);
			setPage(localStorage.getItem('page'));
			roleCheck();
		} else if (
			JSON.stringify(d.getTime()) >= localStorage.getItem('loginExpiry')
		) {
			setPage(7);
		}

		setIsLoading(false);
	}, []);
	document.addEventListener('click', (item) => {
		if (
			!item.target.classList.contains('navbar__mobile') &&
			!item.target.classList.contains('hamburger-react')
		) {
			setOpen(false);
		}
	});

	return (
		<AuthContext.Provider
			value={{
				isAuth,
				setIsAuth,
				isLoading,
			}}
		>
			<AdminContext.Provider
				value={{
					isAdmin,
					setIsAdmin,
				}}
			>
				<RoleContext.Provider value={{ hasRole }}>
					<BrowserRouter>
						<MobileNavbar
							page={page}
							setPage={setPage}
							isOpen={isOpen}
						/>
						<Header
							setPage={setPage}
							isMobile={isMobile}
							isOpen={isOpen}
							setOpen={setOpen}
						/>
						<div className='App'>
							{!isMobile && (
								<Navbar page={page} setPage={setPage} />
							)}
							{onlineBoolean ? (
								<AppRouter setPage={setPage} page={page} roleCheck={roleCheck}/>
							) : (
								<Error />
							)}
						</div>
					</BrowserRouter>
				</RoleContext.Provider>
			</AdminContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
