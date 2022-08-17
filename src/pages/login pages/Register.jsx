import React, {useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [changeContent, setChangeContent] = useState(false);

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [intATC, setIntATC] = useState("");
    const [legalATC, setLegalATC] = useState("");
    const [cityATC, setCityATC] = useState("");
    const [cabinet, setCabinet] = useState("");
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState(1);
    const [jobtitles, setJobTitles] = useState([]);
    const [jobtitle, setJobTitle] = useState(1);
    const [photo, setPhoto] = useState(null);


    function encodeImageFileAsURL(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
            setPhoto(reader.result)
        };
        reader.readAsDataURL(file);
    }
    useEffect(async () => {
        await axios.get("http://10.200.24.103:8089/department/", {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).then((t) => setDepartments(t.data));
        await axios.get("http://10.200.24.103:8089/jobtitle/", {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).then((t) => setJobTitles(t.data));
    }, []);

    const registerForm = async (event) => {
        event.preventDefault();

        const response = await axios.post('http://10.200.24.103:8089/account/register/', {
            email,
            fullname,
            "internal_atc": intATC,
            "legal_atc": legalATC,
            "city_atc": cityATC,
            "password": "12345",
            cabinet,
            department,
            jobtitle,
            photo
        });

        if(response){
            setChangeContent(true)
        }
        console.log(response)
    };

    return (
        <div className='page-body'>
            <h1 style={{textAlign: 'center'}}>Регистрация пользователя:</h1>
            <button onClick={()=>console.log(photo)}>dasd</button>
            {
                changeContent
                    ?
                    <h2 style={{color: "black"}}>Письмо с ссылкой на подтверждение аккаунта было отправлено на вашу почту</h2>
                    :
                    <form className='form' onSubmit={registerForm}>
                        <p>* Обязательное поле</p>
                        <div className="register-inputs">
                            <div className="register-input">
                                <label className="invalid">
                                    ФИО<span className="star">&nbsp;*</span>
                                </label>
                                <input required type="text" onChange={(i) => setFullname(i.target.value)} value={fullname} className="register__input"/>
                            </div>
                            <div className="register-input">
                                <label className="invalid">
                                    Адрес электронной почты<span className="star">&nbsp;*</span>
                                </label>
                                <input required type="text" onChange={(i) => setEmail(i.target.value)} value={email} className="register__input"/>
                            </div>
                            <div className="register-input">
                                <label className="invalid">
                                    Департамент<span className="star">&nbsp;*</span>
                                </label>

                                <select className="select-uni register__deparment" required name="department-select" onChange={(t) => setDepartment(t.target.value)}>
                                    {
                                        departments.map((item) => <option value={item.id}>{item.title}</option>)
                                    }
                                </select>
                                {/*<input required type="text" onChange={(i) => setDepartment(i.target.value)} value={department} className="register__input"></input>*/}
                            </div>
                            <div className="register-input">
                                <label className="invalid">
                                    Должность<span className="star">&nbsp;*</span>
                                </label>
                                <select className="select-uni register__deparment" required name="department-select" onChange={(t) => setJobTitle(t.target.value)}>
                                    {
                                        jobtitles.map((item) => <option value={item.id}>{item.jobtitle}</option>)
                                    }
                                </select>
                                {/*<input required type="text" onChange={(i) => setJobTitle(i.target.value)} value={jobtitle} className="register__input"></input>*/}
                            </div>
                            <div className="register-input">
                                <label className="invalid">
                                    Фото<span className="star">&nbsp;*</span>
                                </label>
                                <input
                                    required
                                    onChange={(t) => {
                                        if(t !== undefined){
                                            encodeImageFileAsURL(t.target.files[0])
                                        }
                                    }}
                                    type="file"
                                    className="register__input__photo"
                                    accept=".jpg, .jpeg, .png"
                                />
                            </div>
                            <div className="register-input">
                                <label className="invalid">
                                    Внутренний АТС<span className="star">&nbsp;*</span>
                                </label>
                                <input required type="text" onChange={(i) => setIntATC(i.target.value)} value={intATC} className="register__input"/>
                            </div>
                            <div className="register-input">
                                <label className="invalid">
                                    Правовой АТС
                                </label>
                                <input type="text" onChange={(i) => setLegalATC(i.target.value)} value={legalATC} className="register__input"/>
                            </div>
                            <div className="register-input">
                                <label className="invalid">
                                    Городской АТС<span className="star">&nbsp;*</span>
                                </label>
                                <input required type="text" onChange={(i) => setCityATC(i.target.value)} value={cityATC} className="register__input"/>
                            </div>
                            <div className="register-input">
                                <label className="invalid">
                                    Кабинет<span className="star">&nbsp;*</span>
                                </label>
                                <input required type="text" onChange={(i) => setCabinet(i.target.value)} value={cabinet} className="register__input"/>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="validate-button"
                            style={{marginLeft: 0, marginTop: 20}}
                        >Регистрация</button>
                    </form>
            }

        </div>
    );
};

export default Register;

{/*<div className="register-input">*/}
{/*    <label className="invalid" title="<strong>Имя</strong><br />Введите ваше полное имя">*/}
{/*        Подтверждение адреса электронной почты<span className="star">&nbsp;*</span>*/}
{/*        {*/}
{/*            exactEmailCheck &&*/}
{/*                <span style={{color: "red", fontSize: 12, paddingLeft: 5}}>Почты не совпадают</span>*/}
{/*        }*/}
{/*    </label>*/}
{/*    <input required type="text" onChange={(i) => {*/}
{/*        setEmailConfirm(i.target.value)*/}
{/*        if(i.target.value === email){*/}
{/*            setExactEmailCheck(false)*/}
{/*        } if(i.target.value !== email){*/}
{/*            setExactEmailCheck(true)*/}
{/*        }*/}
{/*    }} value={emailConfirm} className="register__input"></input>*/}
{/*</div>*/}
{/*<div className="register-input">*/}
{/*    <label className="invalid" title="<strong>Имя</strong><br />Введите ваше полное имя">*/}
{/*        Пароль<span className="star">&nbsp;*</span>*/}
{/*    </label>*/}
{/*    <input required type="password" onChange={(i) => setPassword(i.target.value)} value={password} className="register__input"></input>*/}
{/*</div>*/}
{/*<div className="register-input">*/}
{/*    <label className="invalid" title="<strong>Имя</strong><br />Введите ваше полное имя">*/}
{/*        Повтор пароля<span className="star">&nbsp;*</span>*/}
{/*        {*/}
{/*            exactPasswordCheck &&*/}
{/*                <span style={{color: "red", fontSize: 12, paddingLeft: 5}}>Пароли не совпадают</span>*/}
{/*        }*/}
{/*    </label>*/}
{/*    <input required type="password" onChange={(i) => {*/}
{/*        setPasswordConfirm(i.target.value)*/}
{/*        if(i.target.value === password){*/}
{/*            setExactPasswordCheck(false)*/}
{/*        } if(i.target.value !== password){*/}
{/*            setExactPasswordCheck(true)*/}
{/*        }*/}
{/*    }} value={passwordConfirm} className="register__input"></input>*/}
{/*</div>*/}