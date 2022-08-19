import React, {useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';
import TextField from "@mui/material/TextField/TextField";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

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

    useEffect(() => {
        axios.get("http://10.200.24.103:8089/department/", {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).then((response) => {
            const parentData = [];
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].parent !== null) {
                    parentData.push(response.data[i])
                }
            }
            setDepartments(parentData)
        });

        axios.get("http://10.200.24.103:8089/jobtitle/", {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).then((t) => setJobTitles(t.data));
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
    };

    return (
        <div className='page-body'>
            <h1 style={{textAlign: 'center'}}>Регистрация пользователя:</h1>
            {
                changeContent
                    ?
                    <h2 style={{color: "black"}}>Письмо с ссылкой на подтверждение аккаунта было отправлено на вашу почту</h2>
                    :
                    <form className='form' onSubmit={registerForm}>
                        <p>* Обязательное поле</p>
                        <div className="register-inputs">
                            <div className="register-input">
                                <p className="invalid">
                                    ФИО
                                </p>
                                <TextField
                                    id="outlined"
                                    required
                                    label="Пароль"
                                    value={fullname}
                                    fullWidth
                                    onChange={(i) => setFullname(i.target.value)}
                                />
                            </div>
                            <div className="register-input">
                                <p className="invalid">
                                    Адрес электронной почты
                                </p>
                                <TextField
                                    id="outlined"
                                    required
                                    label="Пароль"
                                    value={email}
                                    fullWidth
                                    onChange={(i) => setEmail(i.target.value)}
                                />
                            </div>
                            <div className="register-input">
                                <p className="invalid">
                                    Департамент
                                </p>

                                <FormControl>
                                    <InputLabel>Выбрать департамент</InputLabel>
                                    <Select sx={{width: 350}} onChange={t => setDepartment(t.target.value)} label="Выбрать департамент">
                                        {
                                            departments.map((item, index) =>
                                                <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="register-input">
                                <p className="invalid">
                                    Должность
                                </p>
                                <FormControl>
                                    <InputLabel>Выбрать должность</InputLabel>
                                    <Select required sx={{width: 350}} onChange={t => setJobTitle(t.target.value)} label="Выбрать должность">
                                        {
                                            jobtitles.map((item, index) =>
                                                <MenuItem key={index} value={item.id}>{item.jobtitle}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="register-input">
                                <p className="invalid">
                                    Фото
                                </p>
                                <input
                                    required
                                    id="raised-button-file"
                                    onChange={(t) => {
                                        if(t !== undefined){
                                            encodeImageFileAsURL(t.target.files[0])
                                        }
                                    }}
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept=".jpg, .jpeg, .png"
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" component="span">
                                        Опубликовать
                                    </Button>
                                </label>
                            </div>
                            <div className="register-input">
                                <p className="invalid">
                                    Внутренний АТС
                                </p>
                                <TextField
                                    id="outlined"
                                    required
                                    label="Внутренний АТС"
                                    value={intATC}
                                    fullWidth
                                    onChange={(i) => setIntATC(i.target.value)}
                                />
                            </div>
                            <div className="register-input">
                                <p className="invalid">
                                    Правовой АТС
                                </p>
                                <TextField
                                    id="outlined"
                                    required
                                    label="Правовой АТС"
                                    value={legalATC}
                                    fullWidth
                                    onChange={(i) => setLegalATC(i.target.value)}
                                />
                            </div>
                            <div className="register-input">
                                <p className="invalid">
                                    Городской АТС
                                </p>
                                <TextField
                                    id="outlined"
                                    required
                                    label="Правовой АТС"
                                    value={cityATC}
                                    fullWidth
                                    onChange={(i) => setCityATC(i.target.value)}
                                />
                            </div>
                            <div className="register-input">
                                <p className="invalid">
                                    Кабинет
                                </p>
                                <TextField
                                    id="outlined"
                                    required
                                    label="Кабинет"
                                    value={cabinet}
                                    fullWidth
                                    onChange={(i) => setCabinet(i.target.value)}
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            variant="outlined"
                            style={{marginLeft: 0, marginTop: 20}}
                        >Регистрация</Button>
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