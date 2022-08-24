import React, {useContext, useEffect, useState} from 'react';
import MyTable from '../components/UI/MyTablet/MyTable';
import c from './pages.module.css';
import axios from 'axios';
import {AdminContext} from "../context";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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

const Home = () => {
    const {isAdmin} = useContext(AdminContext);
    const [parentDepartment, setParentDepartment] = useState();
    const [targetDepartment, setTargetDepartment] = useState();
    const [parentRefDepartment, setParentRefDepartment] = useState();
    const [deletedDepartment, setDeletedDepartment] = useState();
    const [departmentTitle, setDepartmentTitle] = useState("");
    const [wasSent, setWasSent] = useState(false);
    
    // table data fetching
    const [tableData, setTableData] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const getData = async () => {
        const response = await axios.get("http://10.200.24.103:8089/department/", {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).catch(error => console.log(error));
        setAllDepartments(response.data);
        const parentData = [];
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].parent === null) {
                parentData.push(response.data[i])
            }
        }
        setTableData(parentData)
    };
    useEffect(() =>{
        getData()
    }, []);

    const addDepartment = (event) => {
        event.preventDefault();
        let localParent = parentDepartment;
        if(localParent === "Без родителя"){
            localParent = null;
        }
        axios.post("http://10.200.24.103:8089/department/create/",
            {
                title: departmentTitle,
                parent: localParent
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("atoken")}`
                }
            });
        setWasSent(true);
        setTimeout(() => {
            setWasSent(false)
        }, 5000);
        setTimeout(() => getData(), 1000)
    };
    const deleteDepartment = (event) => {
        event.preventDefault();
        axios.delete(`http://10.200.24.103:8089/department/delete/${deletedDepartment}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("atoken")}`
            }
        });
        setTimeout(() => getData(), 1000)
    };
    const updateDepartment = (event) => {
        event.preventDefault();
        let localParent = parentRefDepartment;
        if(localParent === "Без родителя"){
            localParent = null;
        }
        axios.patch(`http://10.200.24.103:8089/department/update/${targetDepartment}/`,
            {
                title: departmentTitle,
                id: targetDepartment,
                parentDepartment: localParent
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("atoken")}`
            }
            });
        setTimeout(() => getData(), 1000)
    };

    const checkId =(id) => {
        if(id === 1) {
            return "selected"
        }   else {
            return false
        }
    };

    const [value, setValue] = React.useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="page-body">
            {
                isAdmin &&
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
                                <div className='admin-form__wrapper'>
                                    <h2>Заполнение нового департамента</h2>
                                    <form onSubmit={addDepartment}>

                                        <TextField fullWidth label="Название департамента" variant="outlined" value={departmentTitle} onChange={(i) => setDepartmentTitle(i.target.value)}/>
                                        <h3>Родительский департамент</h3>
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-label">Родительский департамент</InputLabel>
                                            <Select sx={
                                                {width: {
                                                        lg: 350,
                                                        md: 200,
                                                        sm: 100
                                                    }}
                                            } md={{width: 350}} onChange={t => setParentDepartment(t.target.value)} label="Родительский департамент">
                                                <MenuItem value={null}>Без родителя</MenuItem>
                                                {
                                                    tableData.map((item, index) =>
                                                        <MenuItem key={index} value={item.id} >{item.title}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>

                                        <Button type="submit" variant="contained" size="large" style={{marginLeft: 15, marginTop: 5}}>Добавить</Button>
                                    </form>
                                    {
                                        wasSent &&
                                        <h1>Форма была отправлена!</h1>
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div className='admin-form__wrapper'>
                                    <h2>Удалить департамент</h2>
                                    <form  onSubmit={deleteDepartment}>
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-label">Удалить департамент</InputLabel>
                                            <Select sx={{width: 350}} onChange={t => setDeletedDepartment(t.target.value)} label="Удалить департамент">
                                                {
                                                    allDepartments.map((item, index) =>
                                                        <MenuItem key={index} value={item.id} >{item.title}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        <Button type="submit" variant="contained" size="large" style={{marginLeft: 15, marginTop: 5}}>Удалить</Button>
                                    </form>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <div className='admin-form__wrapper'>
                                    <h2>Изменить департамент</h2>
                                    <form onSubmit={updateDepartment}>
                                        <TextField fullWidth label="Новое название департамента" variant="outlined" value={departmentTitle} onChange={(i) => setDepartmentTitle(i.target.value)}/>
                                        <h3>Выберите департамент</h3>
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-label">Выбрать департамент</InputLabel>
                                            <Select sx={{width: 350}} onChange={t => setTargetDepartment(t.target.value)} label="Выбрать департамент">
                                                {
                                                    allDepartments.map((item, index) =>
                                                        <MenuItem key={index} defaultValue={checkId(item.id)} value={item.id} >{item.title}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                        <h3>Новый родительский департамент</h3>
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-label">Новый родительский департамент</InputLabel>
                                            <Select sx={{width: 350}} onChange={t => setParentRefDepartment(t.target.value)} label="Выбрать родительский департамент">
                                                <MenuItem value={null}>Без родителя</MenuItem>
                                                {
                                                    tableData.map((item, index) =>
                                                        <MenuItem key={index} defaultValue={checkId(item.id)} value={item.id} >{item.title}</MenuItem>
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

            <p className={c.homeText}>Структура</p>

            <MyTable page="department" tableData={tableData}/>
        </div>
    );
};

export default Home;