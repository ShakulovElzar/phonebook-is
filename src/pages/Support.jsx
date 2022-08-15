import axios from 'axios';
import React, { useState } from 'react';

const Support = () => {
    const [reportIssue, setReportIssue] = useState("")
    const [reportText, setReportText] = useState("")

    const sendReport = event => {
        event.preventDefault()
        const user = sessionStorage.getItem("user")
        const response = axios.post('http://10.200.24.103:8089/help/create/',{Headers: {
            "Authorization": sessionStorage.getItem("atoken")
        }}, {
            "choise": reportIssue,
            "description": reportText,
            "for_whom": user,
            "author": 1
        })
    }

    const changeReportIssue = (value) => {
        setReportIssue(value)
    }
    return (
        <div className='page-body body-box'>
            <div className='help__header'>
                    <div className='help__header-title'>Нужна помощь?</div>
                    <div className='help__header-description'>Оставьте своё сообщение и мы вам поможем</div>
                </div>
                <form className='help__form' onSubmit={sendReport}>
                    <div className='form__inputs'>
                        <p className='select-title'>Что вам нужно?</p>
                        <select className='inputbox' name="select" id="select" onChange={(el) => changeReportIssue(el.target.value)}>
                            <option disabled>Выберите пункт</option>
                            <option value="Замена картриджа">Заменить картридж</option>
                            <option value="Поломка персонального компьютерпа">Поломка персонального компьютера</option>
                            <option value="Другое">Другое</option>
                        </select>
                        <div className='item-problem'>
                            <p>Опишите свою проблему</p>
                            <textarea className='problem-textarea' placeholder='Сообщение' name="problem" id="problem" value={reportText} onChange={(el) => setReportText(el.target.value)}/>
                        </div>
                    </div>
                    <button type='submit'className='form-submit' style={{textTransform: 'uppercase'}}>Отправить</button>
                </form>
        </div>
    );
};

export default Support;