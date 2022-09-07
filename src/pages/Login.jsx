import axios from 'axios';
import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import c from './pages.module.css';
import {AdminContext, AuthContext} from '../context';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import jwtDecode from 'jwt-decode';

const Login = props => {
	const { setIsAdmin } = useContext(AdminContext);
	let { setIsAuth } = useContext(AuthContext);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ rememberMe, setRememberMe ] = useState(false);
	const [ emailDirty, setEmailDirty ] = useState(false);
	const [ emailError, setEmailError ] = useState('Поле электронной почты не может быть пустым');
	const [ passwordError, setPasswordError ] = useState('');

	const login = async event => {
		event.preventDefault();
		let localPassword = password;
		if (password === '') {
			localPassword = '12345';
		}
		const response = await axios
			.post('http://10.200.24.103:8089/account/login/', {
				email,
				password: localPassword,
			})
			.catch(error => {
				let message = error.response.data;
				if (message.hasOwnProperty('email')) {
					setEmailError('Неправильный логин');
				} else if (message.hasOwnProperty('non_field_errors')) {
					setPasswordError('Неправильный пароль');
				}
			});
		if (response === undefined) return;
		localStorage.setItem('atoken', response.data.access);
		localStorage.setItem('rtoken', response.data.refresh);
		localStorage.setItem('user', response.data.email);
		localStorage.setItem('page', '1');
		props.setPage(1);
		props.isAdminCheck();
		setIsAuth(true);
		if (rememberMe) {
			const decodedToken = jwtDecode(response.data.access);
			localStorage.setItem('loginExpiry', JSON.stringify(decodedToken.exp));
		}
	};

	const emailHandler = e => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailError('Некорректная эл.почта');
		} else {
			setEmailError('');
		}
	};
	const blurHandler = e => {
		switch (e.target.name) {
			case 'email':
				setEmailDirty(true);
				break;
		}
	};

	return (
		<div className={c.loginBody}>
			<form className="login__form" onSubmit={login}>

				<div className="login__control">
					<div className="login__label">
						<label id="username-lbl">
							Логин *
						</label>
						<TextField
							error={emailDirty}
							id="outlined-error"
							label="Почта"
							value={email}
							helperText={emailError}
							fullWidth
							onChange={e => {
								setEmail(e.target.value);
								emailHandler(e);
							}}
							style={{ marginTop: 15 }}
						/>
					</div>
				</div>

				<div className="login__control">
					<div className="login__label">
						<label id="password-lbl">
							Пароль *
						</label>
						<div style={{ color: 'red', fontSize: '12px' }}>{passwordError}</div>
						<TextField
							id="outlined"
							label="Пароль"
							value={password}
							fullWidth
							type="password"
							onChange={e => {
								setPassword(e.target.value);
							}}
							style={{ marginTop: 15, marginBottom: 15 }}
						/>
					</div>
				</div>

				<div className="submit__module">
					<Button type="submit" variant="contained" size="large">Войти</Button>
					<div className="login__rememberme">
						<label>Запомнить меня</label>
						<input
							type="checkbox"
							value={rememberMe}
							onClick={() => {
								if (rememberMe === false) {
									setRememberMe(true);
								}
							}}
							className="login__inputbox"
						/>
					</div>
				</div>
			</form>

			<ul className="login__links">
				<li className="login__links_item">
					<Link to="/login/register">
						Ещё нет учётной записи?
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Login;
