import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import c from './pages.module.css'
import { AuthContext } from '../context';
import { useContext } from 'react';


const Login = () => {
	let {setIsAuth} = useContext(AuthContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const serverResponse = {}
	
    const login = async (event) => {
		event.preventDefault()
        const response = await axios.post('http://10.200.24.103:8089/account/login/', {
			email,
         	password
		})
		console.log(response);
		if(response.statusText !== "OK") return;
		sessionStorage.setItem("atoken", response.data.access)
		sessionStorage.setItem("rtoken", response.data.refresh)
		sessionStorage.setItem("user", response.data.email)
		setIsAuth(true)
    }

	

    return (
        <div className={c.loginBody}>
            <form className="login__form" onSubmit={login}>

				<div className="login__control">
					<div className="login__label">
						<label id="username-lbl">
	                        Логин *
                        </label>					
						<input onChange={e => setEmail(e.target.value)} type="text" value={email} className="login__input"/></div>
				    </div>

					<div className="login__control">
					    <div className="login__label">
						    <label id="password-lbl">
	                            Пароль *
                            </label>					
						<input onChange={e => setPassword(e.target.value)} type="password" value={password} className="login__input"/>					</div>
				    </div>
					
            <div className="submit__module">
                <button type='submit' className="login__button">
			    Войти</button>

                <div className="login__rememberme">
			        <label>Запомнить меня</label>
			        <input type="checkbox" id="remember" className="login__inputbox"/> 
		        </div>
            </div>	
        </form>

	    <ul className="login__links">
		    <li className="login__links_item">
			    <Link to="/login/update-password">
				    Забыли пароль?
                </Link>
		    </li>
		    <li className="login__links_item">
			<Link to="/login/update-email">
				Забыли логин?			</Link>
		    </li>
				<li className="login__links_item">
			<Link to="/login/register">
				Ещё нет учётной записи?</Link>
		</li>
			</ul>
        </div>
    );
};

export default Login;