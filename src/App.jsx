import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './styles/App.css';
import './styles/normalize.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import {AdminContext, AuthContext, RoleContext} from './context/';
import Error from './pages/Error';
import axios from 'axios';

function App() {
	const [ isAuth, setIsAuth ] = useState(false);
	const [ isAdmin, setIsAdmin ] = useState(false);
	const [ hasRole, setHasRole ] = useState('');
	const [ isLoading, setIsLoading ] = useState(true);
	const [ page, setPage ] = useState(1);

	// internet connection check
	let onlineBoolean = navigator.onLine;

	const isAdminCheck = () => {
		axios
			.get('http://10.200.24.103:8089/account/', {
				headers: { Authorization: `Bearer ${localStorage.getItem('atoken')}` },
			})
			.then(resp => {
				for (let i = 0; i < resp.data.length; i++) {
					if (resp.data[i].email === localStorage.getItem('user')) {
						if (resp.data[i].is_staff) {
							setIsAdmin(true);
						}
						// role check
						if (resp.data[i].role === 'NPA') {
							setHasRole(resp.data[i].role);
						}
						if (resp.data[i].role === 'CADR') {
							setHasRole(resp.data[i].role);
						}
						if (resp.data[i].role === 'MANAGER') {
							setHasRole(resp.data[i].role);
						}
						if (resp.data[i].role === 'MANAGER_IT') {
							setHasRole(resp.data[i].role);
						}
						if (resp.data[i].role === 'PROFCOM') {
							setHasRole(resp.data[i].role);
						}
						if (resp.data[i].role === 'IT_SPECIALIST') {
							setHasRole(resp.data[i].role);
						}
					}
				}
			});
	};

	// 0 - pending, 1 - in work, 2 - done, 3 - checked

	useEffect(
		() => {
			const d = new Date();
			if (JSON.stringify(d.getTime()) <= localStorage.getItem('loginExpiry')) {
				setIsAuth(true);
				setPage(localStorage.getItem('page'));
				isAdminCheck();
			} else if (JSON.stringify(d.getTime()) >= localStorage.getItem('loginExpiry')) {
				setPage(7);
			}

			setIsLoading(false);
		},
		[]
	);

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
						<Header setPage={setPage} />
						<div className="App">
							<Navbar page={page} setPage={setPage} />
							{onlineBoolean ? <AppRouter setPage={setPage} page={page} isAdminCheck={isAdminCheck} /> : <Error />}
						</div>
					</BrowserRouter>
				</RoleContext.Provider>
			</AdminContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
