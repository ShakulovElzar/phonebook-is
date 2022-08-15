import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [emailConfirm, setEmailConfirm] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const registerForm = async () => {
        const response = await axios.post('http://10.200.24.103:8089/account/register/', {
            "email": email,
            "password": password,
            "password_confirm": passwordConfirm,
            "username": username
        })
        console.log(response);
    }

    return (
        <div className='page-body'>
            <h1 style={{textAlign: 'center'}}>Регистрация пользователя</h1>
            <div className='form'>
                <p>* Обязательное поле</p>
                <div className="register-inputs">
                    <div className="register-input">
                        <label className="required invalid" title="<strong>Имя</strong><br />Введите ваше полное имя">
	                        Логин<span className="star">&nbsp;*</span>
                        </label>
                        <input type="text" onChange={(i) => setUsername(i.target.value)}  id="jform_name" value={username} className="register__input"></input>
                    </div>
                    <div className="register-input">
                        <label className="required invalid" title="<strong>Имя</strong><br />Введите ваше полное имя">
	                        Пароль<span className="star">&nbsp;*</span>
                        </label>
                        <input type="password" onChange={(i) => setPassword(i.target.value)}  id="jform_name" value={password} className="register__input"></input>
                    </div>
                    <div className="register-input">
                        <label className="required invalid" title="<strong>Имя</strong><br />Введите ваше полное имя">
	                        Повтор пароля<span className="star">&nbsp;*</span>
                        </label>
                        <input type="password" onChange={(i) => setPasswordConfirm(i.target.value)}  id="jform_name" value={passwordConfirm} className="register__input"></input>
                    </div>
                    <div className="register-input">
                        <label className="required invalid" title="<strong>Имя</strong><br />Введите ваше полное имя">
                        Адрес электронной почты<span className="star">&nbsp;*</span>
                        </label>
                        <input type="text" onChange={(i) => setEmail(i.target.value)}  id="jform_name" value={email} className="register__input"></input>
                    </div>
                    <div className="register-input">
                        <label className="required invalid" title="<strong>Имя</strong><br />Введите ваше полное имя">
                        Подтверждение адреса электронной почты<span className="star">&nbsp;*</span>
                        </label>
                        <input type="text" onChange={(i) => setEmailConfirm(i.target.value)}  id="jform_name" value={emailConfirm} className="register__input"></input>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="validate-button" 
                    style={{marginLeft: 0, marginTop: 20}}
                    onClick={() => registerForm()}    
                >Регистрация</button>
            </div>
        </div>
    );
};

export default Register;