import React, {useContext, useEffect, useState} from 'react';
import MTable from "../components/UI/MaterialTable/MTable";
import axios from "axios";
import {AdminContext} from "../context";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ paddingTop: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Journal = () => {
    const {isAdmin, isSuperAdmin} = useContext(AdminContext);
    const [users, setUsers] = useState([]);
    const [reasonText, setReasonText] = useState("");
    const [jobtitles, setJobtitles] = useState([]);
    const [fullname, setFullname] = useState("");
    const [updateFullname, setUpdateFullname] = useState(1);
    const [jobtitle, setJobtitle] = useState(1);
    const [updateJobtitle, setUpdateJobtitle] = useState(1);
    const [deleteRef, setDeleteRef] = useState(1);
    const [sendFullname, setSendFullname] = useState(1);
    const [NewSendFullname, setNewSendFullname] = useState(1);
    const [stuff, setStuff] = useState([]);

    const [headers] = useState([
        "По причине",
        "ФИО",
        "Должность",
        "Отпросился у",
    ]);
    const getData = async () => {
        axios.get("http://10.200.24.103:8089/journal/", {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).then((t) => setStuff(t.data));
        axios.get('http://10.200.24.103:8089/account/', {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).then((t) => setUsers(t.data));
        axios.get('http://10.200.24.103:8089/jobtitle/', {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).then((t) => setJobtitles(t.data));
    };
    // const getJobtitle = () => {
    //     let userID = fullname;
    //     for (let i = 0; i < users.length; i++) {
    //         if(users[i].id === userID){
    //             for (let j = 0; j < jobtitles.length; j++) {
    //                 console.log(jobtitles[j].jobtitle, users[i])
    //                 if(jobtitles[j].jobtitle === users[i].jobtitle){
    //                     setJobtitle(jobtitles[j].id)
    //                 }
    //
    //             }
    //         }
    //     }
    // };
    useEffect(() => {
        getData()
    }, []);
    const addUser = (event) => {
        event.preventDefault();
        axios.post("http://10.200.24.103:8089/journal/create/",{
            reason: reasonText,
            fullname,
            jobtitle,
            whom_asked: sendFullname
        }, {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}});
        setTimeout(() => {
            getData()
        }, 2000)
    };
    const deleteUser = (event) => {
        event.preventDefault();
        axios.delete(`http://10.200.24.103:8089/journal/${deleteRef}/delete`, {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}});
        setTimeout(() => {
            getData()
        }, 1000)
    };
    const updateUser = (event) => {
        event.preventDefault();
        axios.patch(`http://10.200.24.103:8089/journal/${updateFullname}/update/`,{
            reason: reasonText,
            fullname: updateFullname,
            jobtitle: updateJobtitle,
            whom_asked: NewSendFullname
        }, {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}});
        setTimeout(() => {
            getData()
        }, 2000)
    };

    const [value, setValue] = React.useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='page-body'>

            {
                (isSuperAdmin || isAdmin) &&
                    <>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Добавить"/>
                                    <Tab label="Удалить"/>
                                    <Tab label="Обновить"/>
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <div className="admin-form__wrapper">
                                    <h2>Добавить</h2>
                                    <form onSubmit={addUser}>
                                        <TextField fullWidth required label="Причина" variant="outlined" value={reasonText} onChange={(i) => setReasonText(i.target.value)}/>
                                        <h3>Выберите человека</h3>
                                        <FormControl>
                                            <InputLabel>Выбрать человека</InputLabel>
                                            <Select sx={{width: 350}} onChange={t => {
                                                setFullname(t.target.value);
                                                // getJobtitle();
                                            }} label="Выбрать человека">
                                                {
                                                    users.map((item, index) =>
                                                        <MenuItem key={index} value={item.id}>{item.fullname}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        <h3>Выберите должность человека</h3>
                                        <FormControl>
                                            <InputLabel>Выбрать должность</InputLabel>
                                            <Select sx={{width: 350}} onChange={t => setJobtitle(t.target.value)} label="Выбрать должность">
                                                {
                                                    jobtitles.map((item, index) =>
                                                        <MenuItem key={index} value={item.id}>{item.jobtitle}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        <h3>Выберите человека, у которого он отпросился</h3>
                                        <FormControl>
                                            <InputLabel>Выбрать человека</InputLabel>
                                            <Select sx={{width: 350}} onChange={t => setSendFullname(t.target.value)} label="Выбрать человека">
                                                {
                                                    users.map((item, index) =>
                                                        <MenuItem key={index} value={item.id}>{item.fullname}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        <Button type="submit" variant="contained" size="large" style={{marginLeft: 15, marginTop: 5}}>Добавить</Button>
                                    </form>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div className="admin-form__wrapper">
                                    <h2>Удалить</h2>
                                    <form onSubmit={deleteUser}>
                                        <h3>Выберите пост</h3>
                                        <FormControl>
                                            <InputLabel>Выберите пост</InputLabel>
                                            <Select sx={{width: 350}} onChange={t => setDeleteRef(t.target.value)} label="Выбрать пост">
                                                {
                                                    stuff.map((item, index) =>
                                                        <MenuItem key={index} value={item.id}>{item.fullname}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        <Button type="submit" variant="contained" size="large" style={{marginLeft: 15, marginTop: 5}}>Удалить</Button>
                                    </form>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <div className="admin-form__wrapper">
                                    <h2>Изменить пост</h2>
                                    <form onSubmit={updateUser}>
                                        <TextField fullWidth required label="Новая причина" variant="outlined" value={reasonText} onChange={(i) => setReasonText(i.target.value)}/>
                                        <h3>Выберите человека</h3>
                                        <FormControl>
                                            <InputLabel>Выбрать человека</InputLabel>
                                            <Select sx={{width: 350}} onChange={t => setUpdateFullname(t.target.value)} label="Выбрать НПА">
                                                {
                                                    stuff.map((item, index) =>
                                                        <MenuItem key={index} value={item.id}>{item.fullname}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        <h3>Выберите должность человека</h3>
                                        <FormControl>
                                            <InputLabel>Выбрать должность</InputLabel>
                                            <Select sx={{width: 350}} onChange={t => setUpdateJobtitle(t.target.value)} label="Выбрать должность">
                                                {
                                                    jobtitles.map((item, index) =>
                                                        <MenuItem key={index} value={item.id}>{item.jobtitle}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        <h3>Выберите человека, у которого он отпросился</h3>
                                        <FormControl>
                                            <InputLabel>Выбрать должность</InputLabel>
                                            <Select sx={{width: 350}} onChange={t => setNewSendFullname(t.target.value)} label="Выбрать должность">
                                                {
                                                    users.map((item, index) =>
                                                        <MenuItem key={index} value={item.id}>{item.email}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        <Button type="submit" variant="contained" size="large" style={{marginLeft: 15, marginTop: 5}}>Изменить</Button>
                                    </form>
                                </div>
                            </TabPanel>
                        </Box>
                    </>
            }

            <h2 style={{color: "#000"}}>Журнал: </h2>
            <MTable journal={true} image={false} headers={headers} bodies={stuff}/>
        </div>
    );
};

export default Journal;