import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AdminContext} from "../context";
import MTable from "../components/UI/MaterialTable/MTable";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
    const {children, value, index} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{paddingTop: 1}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Support = () => {
    const {isSuperAdmin, isAdmin} = useContext(AdminContext);
    const [reportIssue, setReportIssue] = useState(1);
    const [reportText, setReportText] = useState("");
    const [reportDestination, setReportDestination] = useState(1);

    const [value, setValue] = React.useState();
    const [options, setOptions] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [journalData, setJournalData] = useState([]);
    const [deletePost, setDeletePost] = useState(0);
    const [addOptionText, setAddOptionText] = useState("");
    const [deleteOptionItem, setDeleteOptionItem] = useState(0);
    const [updateOptionItem, setUpdateOptionItem] = useState(0);
    const [addWorkerText, setAddWorkerText] = useState("");
    const [deleteWorkerItem, setDeleteWorkerItem] = useState(0);
    const [updateWorkerItem, setUpdateWorkerItem] = useState(0);


    const getJournalData = () => {
        axios.get("http://10.200.24.103:8089/help/", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("atoken")}`
            }
        }).then(t => setJournalData(t.data));
    };
    const getOptionsData = () => {
        axios.get("http://10.200.24.103:8089/help/option/", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("atoken")}`
            }
        }).then(t => setOptions(t.data));
    };
    const getWorkersData = () => {
        axios.get("http://10.200.24.103:8089/help/worker/", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("atoken")}`
            }
        }).then(t => setWorkers(t.data));
    };
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
        setTimeout(() => {
            getJournalData();
        }, 500);
    };
    useEffect(() => {
        getOptionsData();
        getWorkersData();
        getJournalData();
    }, []);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const deleteReport = (event) => {
        event.preventDefault();
        axios.delete(`http://10.200.24.103:8089/help/delete/${deletePost}/`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("atoken")}`
            }
        });
        setTimeout(() => {
            getJournalData();
        }, 500);
        handleChange('click', 0);
    };
    const addOption = (event) => {
        event.preventDefault();
        axios.post("http://10.200.24.103:8089/help/option/create/",
            {
                choice: addOptionText
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("atoken")}`
                }
            });
        setTimeout(() => {
            getOptionsData();
        }, 500);
    };
    const deleteOption = (event) => {
        event.preventDefault();
        axios.delete(`http://10.200.24.103:8089/help/option/delete/${deleteOptionItem}/`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("atoken")}`
                }
            });
        setTimeout(() => {
            getOptionsData();
        }, 500);
    };
    const updateOption = (event) => {
        event.preventDefault();
        axios.patch(`http://10.200.24.103:8089/help/option/update/${updateOptionItem}/`,
            {
                choice: addOptionText
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("atoken")}`
                }
            });
        setTimeout(() => {
            getOptionsData();
        }, 500);
    };
    const addWorker = (event) => {
        event.preventDefault();
        axios.post("http://10.200.24.103:8089/help/worker/create/",
            {
                workername: addWorkerText
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("atoken")}`
                }
            });
        setTimeout(() => {
            getWorkersData();
        }, 500);
    };
    const deleteWorker = (event) => {
        event.preventDefault();
        axios.delete(`http://10.200.24.103:8089/help/worker/delete/${deleteWorkerItem}/`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("atoken")}`
                }
            });
        setTimeout(() => {
            getWorkersData();
        }, 500);
    };
    const updateWorker = (event) => {
        event.preventDefault();
        axios.patch(`http://10.200.24.103:8089/help/worker/update/${updateWorkerItem}/`,
            {
                workername: addWorkerText
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("atoken")}`
                }
            });
        setTimeout(() => {
            getWorkersData();
        }, 500);
    };

    return (
        <div className='page-body body-box'>
            {
                isAdmin &&
                <div style={{marginBottom: 25, width: "100%"}}>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Список заявок"/>
                                <Tab label="Удалить заявку"/>
                                <Tab label="Управление темами отправки"/>
                                <Tab label="Управление работниками"/>
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <MTable headers={["Описание", "Тип", "Для кого", "Автор"]} bodies={journalData}
                                    supportTable={true}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <form onSubmit={deleteReport} style={{marginTop: 20}}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Выбрать обращение для
                                        удаления</InputLabel>
                                    <Select sx={{width: 350}} onChange={t => setDeletePost(t.target.value)}
                                            label="Выбрать обращение">
                                        {
                                            journalData.map((item, index) =>
                                                <MenuItem key={index}
                                                          value={item.id}>{item.author}: {item.description.slice(0, 15)}...</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <Button type="submit" variant="contained" size="large"
                                        style={{marginLeft: 15, marginTop: 5}}>Удалить</Button>
                            </form>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <h3>Добавить опцию</h3>
                            <form onSubmit={addOption} style={{margin: "20px 0px"}}>
                                <TextField sx={{width: 400}} variant="outlined" label="Добавить опцию"
                                           onChange={t => setAddOptionText(t.target.value)}/>
                                <Button type="submit" variant="contained" size="large"
                                        style={{marginLeft: 15, marginTop: 5}}>Добавить</Button>
                            </form>
                            <h3>Удалить опцию</h3>
                            <form onSubmit={deleteOption} style={{margin: "20px 0px"}}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Удалить опцию</InputLabel>
                                    <Select sx={{width: 350}} onChange={t => setDeleteOptionItem(t.target.value)}
                                            label="Выбрать опцию">
                                        {
                                            options.map((item, index) =>
                                                <MenuItem key={index}
                                                          value={item.id}>{item.choice}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <Button type="submit" variant="contained" size="large"
                                        style={{marginLeft: 15, marginTop: 5}}>Удалить</Button>
                            </form>
                            <h3>Обновить опцию</h3>
                            <form style={{margin: "20px 0px"}} onSubmit={updateOption}>
                                <TextField sx={{width: 400}} style={{marginRight: 20}} variant="outlined"
                                           label="Новое название опции"
                                           onChange={t => setAddOptionText(t.target.value)}/>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Выбрать опцию </InputLabel>
                                    <Select sx={{width: 350}} onChange={t => setUpdateOptionItem(t.target.value)}
                                            label="Выбрать опцию">
                                        {
                                            options.map((item, index) =>
                                                <MenuItem key={index}
                                                          value={item.id}>{item.choice}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>

                                <Button type="submit" variant="contained" size="large"
                                        style={{marginLeft: 15, marginTop: 5}}>Добавить</Button>
                            </form>
                            <form style={{margin: "20px 0px"}}></form>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <h3>Добавить работника</h3>
                            <form onSubmit={addWorker} style={{margin: "20px 0px"}}>
                                <TextField sx={{width: 400}} variant="outlined" label="Добавить работника"
                                           onChange={t => setAddWorkerText(t.target.value)}/>
                                <Button type="submit" variant="contained" size="large"
                                        style={{marginLeft: 15, marginTop: 5}}>Добавить</Button>
                            </form>
                            <h3>Удалить работника</h3>
                            <form onSubmit={deleteWorker} style={{margin: "20px 0px"}}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Удалить работника</InputLabel>
                                    <Select sx={{width: 350}} onChange={t => setDeleteWorkerItem(t.target.value)}
                                            label="Выбрать работника">
                                        {
                                            workers.map((item, index) =>
                                                <MenuItem key={index}
                                                          value={item.id}>{item.workername}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <Button type="submit" variant="contained" size="large"
                                        style={{marginLeft: 15, marginTop: 5}}>Удалить</Button>
                            </form>
                            <h3>Обновить работника</h3>
                            <form style={{margin: "20px 0px"}} onSubmit={updateWorker}>
                                <TextField sx={{width: 400}} style={{marginRight: 20}} variant="outlined"
                                           label="Новое имя работника"
                                           onChange={t => setAddWorkerText(t.target.value)}/>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Выбрать работника </InputLabel>
                                    <Select sx={{width: 350}} onChange={t => setUpdateWorkerItem(t.target.value)}
                                            label="Выбрать опцию">
                                        {
                                            workers.map((item, index) =>
                                                <MenuItem key={index}
                                                          value={item.id}>{item.workername}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>

                                <Button type="submit" variant="contained" size="large"
                                        style={{marginLeft: 15, marginTop: 5}}>Изменить</Button>
                            </form>
                            <form style={{margin: "20px 0px"}}></form>
                        </TabPanel>
                    </Box>
                </div>
            }
            <div className='help__header'>
                <span className='help__header-title'>Нужна помощь?</span>
                <span className='help__header-description'>Оставьте своё сообщение и мы вам поможем</span>
                <span
                    className='help__header-description'>В ответ на обращение на вашу почту придет сообщение.</span>
            </div>
            <form className='help__form' onSubmit={sendReport}>
                <div className='form__inputs'>
                    <p className='select-title'>Что вам нужно?</p>
                    <FormControl>
                        <InputLabel id="demo-simple-select-helper-label">Выберите пункт</InputLabel>
                        <Select sx={{width: 400}} onChange={t => setReportIssue(t.target.value)}
                                label="Выбрать пункт" labelId="demo-simple-select-helper-label">
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
                        <Select sx={{width: 400}} onChange={t => setReportDestination(t.target.value)}
                                label="Выбрать человека" labelId="demo-simple-select-helper-label">
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
                <Button type="submit" variant="contained" size="large"
                        style={{marginTop: 5, textTransform: 'uppercase', marginLeft: 130}}>Отправить</Button>
            </form>
        </div>
    );
};

export default Support;
