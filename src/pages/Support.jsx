import axios from 'axios';
import React, {useEffect, useState} from 'react';
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Support = () => {
    const [reportIssue, setReportIssue] = useState(1);
    const [reportText, setReportText] = useState("");
    const [reportDestination, setReportDestination] = useState(1);

    const [options, setOptions] = useState([]);
    const [workers, setWorkers] = useState([]);

    const sendReport = event => {
        event.preventDefault();

        axios.post(
            'http://10.200.24.103:8089/help/create/',
            {
                "choice": reportIssue,
                "description": reportText,
                "for_whom": reportDestination,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("atoken")}`
                }
            }
        );
        setReportText("");
        setReportIssue(1);
        setReportDestination(1);
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
                    <span className='help__header-title'>Нужна помощь?</span>
                    <span className='help__header-description'>Оставьте своё сообщение и мы вам поможем</span>
                    <span className='help__header-description'>В ответ на обращение на вашу почту придет сообщение.</span>
                </div>
                <form className='help__form' onSubmit={sendReport}>
                    <div className='form__inputs'>
                        <p className='select-title'>Что вам нужно?</p>
                        <FormControl>
                            <InputLabel id="demo-simple-select-helper-label">Выберите пункт</InputLabel>
                            <Select sx={{width: 400}} onChange={t => setReportIssue(t.target.value)} label="Выбрать пункт" labelId="demo-simple-select-helper-label">
                                {
                                    options.map((item, index) =>
                                        <MenuItem key={index} value={item.id}>{item.choice}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        <p className='select-title'>Кому:</p>
                        <FormControl>
                            <InputLabel id="demo-simple-select-helper-label">Выберите получателя</InputLabel>
                            <Select sx={{width: 400}} onChange={t => setReportDestination(t.target.value)} label="Выбрать человека" labelId="demo-simple-select-helper-label">
                                {
                                    workers.map((item, index) =>
                                        <MenuItem key={index} value={item.id}>{item.workername}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        <div className='item-problem'>
                            <p>Опишите свою проблему</p>
                            <TextField
                                style={{marginBottom: 20, width: 400}}
                                id="outlined-multiline-static"
                                label="Сообщение"
                                multiline
                                rows={4}
                                value={reportText}
                                onChange={(el) => setReportText(el.target.value)}
                            />
                        </div>
                    </div>
                    <Button type="submit" variant="contained" size="large" style={{marginTop: 5, textTransform: 'uppercase', marginLeft: 130}}>Отправить</Button>
                </form>
        </div>
    );
};

export default Support;