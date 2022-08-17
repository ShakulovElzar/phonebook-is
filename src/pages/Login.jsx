import axios from 'axios';
import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import c from './pages.module.css'
import {AuthContext} from '../context';
import {useContext} from 'react';


const Login = (props) => {
    let {setIsAuth, IP} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Поле электронной почты не может быть пустым');
    const [passwordError, setPasswordError] = useState('Поле пароля не может быть пустым');

    const login = async (event) => {
        event.preventDefault();
        let localPassword = password;
        if(password === ""){
            localPassword = "12345"
        }
        const response = await axios.post('http://10.200.24.103:8089/account/login/', {
            email,
            password: localPassword
        }).catch(error => {
			let message = error.response.data;
			if(message.hasOwnProperty("non_field_errors")){
				setPasswordError("Неправильный пароль")
			} else if(message.hasOwnProperty("email")){
				setEmailError("Неправильный логин")
			}
		});
        if (response === undefined) return;
        localStorage.setItem("atoken", response.data.access);
        localStorage.setItem("rtoken", response.data.refresh);
        localStorage.setItem("user", response.data.email);

        setIsAuth(true);
        props.setPage(1);
        localStorage.setItem("page", JSON.stringify(1));
        if(rememberMe){
            localStorage.setItem("IP", IP)
        }
    };

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректная эл.почта')
        } else {
            setEmailError('')
        }
    };
    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 4 || e.target.value.length > 20) {
            setPasswordError('Пароль не должен быть менее 4 символов');
            if (!e.target.value) {
                setPasswordError('Поле пароля не может быть пустым')
            }
        } else {
            setPasswordError('')
        }

    };
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
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
                        {(emailDirty && emailError) && <div style={{color: 'red', fontSize: '12px'}}>{emailError}</div>}
                        <input onBlur={e => blurHandler(e)} name='email' onChange={e => {
                            setEmail(e.target.value);
                            emailHandler(e)
                        }} type="text" value={email} className="login__input"/></div>
                </div>

                <div className="login__control">
                    <div className="login__label">
                        <label id="password-lbl">
                            Пароль *
                        </label>
                        {(passwordDirty && passwordError) && <div style={{color: 'red', fontSize: '12px'}}>{passwordError}</div>}
                        <input onBlur={e => blurHandler(e)} name='password' onChange={e => {
                            setPassword(e.target.value);
                            passwordHandler(e)
                        }} type="password" value={password} className="login__input"/>
                    </div>
                </div>

                <div className="submit__module">
                    <button type='submit' className="login__button">
                        Войти
                    </button>

    <div className="login__rememberme">
                        <label>Запомнить меня</label>
                        <input type="checkbox" value={rememberMe} onClick={() => {
							if(rememberMe === false) {
								setRememberMe(true)
							}
						}} className="login__inputbox"/>
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
                        Забыли логин? </Link>
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