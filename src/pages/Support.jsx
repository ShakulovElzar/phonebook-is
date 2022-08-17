import axios from 'axios';
import React, {useEffect, useState} from 'react';

const Support = () => {
    const [reportIssue, setReportIssue] = useState(1);
    const [reportText, setReportText] = useState("");
    const [reportDestination, setReportDestination] = useState(1);

    const [options, setOptions] = useState([]);
    const [workers, setWorkers] = useState([]);

    const sendReport = event => {
        event.preventDefault();
        const token = localStorage.getItem("atoken");

        axios.post(
            'http://10.200.24.103:8089/help/create/',
            {
                "choice": reportIssue,
                "description": reportText,
                "for_whom": reportDestination,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    };

    useEffect(() => {
        axios.get("http://10.200.24.103:8089/help/option/", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("atoken")}`
            }
        }).then(t => setOptions(t.data));
        axios.get("http://10.200.24.103:8089/help/worker/", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("atoken")}`
            }
        }).then(t => setWorkers(t.data))
    }, []);
    return (
        <div className='page-body body-box'>
            <div className='help__header'>
                    <div className='help__header-title'>Нужна помощь?</div>
                    <div className='help__header-description'>Оставьте своё сообщение и мы вам поможем</div>
                    <div className='help__header-description'>В ответ на обращение на вашу почту придет сообщение.</div>
                </div>
                <form className='help__form' onSubmit={sendReport}>
                    <div className='form__inputs'>
                        <p className='select-title'>Что вам нужно?</p>
                        <select className='select-uni' name="select" onChange={(el) => setReportIssue(el.target.value)}>
                            <option disabled>Выберите пункт</option>
                            {
                                options.map((item) => <option key={item.id} value={item.id}>{item.choice}</option>)
                            }
                        </select>
                        <p className='select-title'>Кому:</p>
                        <select className='inputbox' name="selectt" onChange={(el) => setReportDestination(el.target.value)}>
                            <option disabled>Выберите пункт</option>
                            {
                                workers.map((item) => <option key={item.id} value={item.id}>{item.workername}</option>)
                            }
                        </select>
                        <div className='item-problem'>
                            <p>Опишите свою проблему</p>
                            <textarea className='problem-textarea' placeholder='Сообщение' name="problem" id="problem" value={reportText} onChange={(el) => setReportText(el.target.value)}/>
                        </div>
                    </div>
                    <button type='submit' className='form-submit' style={{textTransform: 'uppercase'}}>Отправить</button>
                </form>
        </div>
    );
};

export default Support;