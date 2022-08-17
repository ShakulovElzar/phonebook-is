import React, {useContext} from 'react';
import MyTable from '../components/UI/MyTablet/MyTable';
import c from './pages.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {AdminContext} from "../context";

const Home = () => {
    const {isSuperAdmin} = useContext(AdminContext);
    const [parentDepartment, setParentDepartment] = useState(1);
    const [departmentTitle, setDepartmentTitle] = useState("");
    const [deletedDepartment, setDeletedDepartment] = useState(1);
    const [wasSent, setWasSent] = useState(false);
    
    // table data fetching
    const [tableData, setTableData] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const getData = async () => {
        const response = await axios.get("http://10.200.24.103:8089/department/", {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}});
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
        axios.post("http://10.200.24.103:8089/department/create/",
            {
                title: departmentTitle,
                parent: parentDepartment
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("atoken")}`
                }
            });
        setWasSent(true);
        setTimeout(() => {
            setWasSent(false)
        }, 5000)
    };

    const deleteDepartment = () => {
        axios.delete(`http://10.200.24.103:8089/department/delete/${deletedDepartment}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("atoken")}`
            }
        })
    };

    const checkId =(id) => {
        if(id === 1) {
            return "selected"
        }   else {
            return false
        }
    };

    return (
        <div className="page-body">
            {
                isSuperAdmin &&
                    <>
                    <div style={{border: "1px solid black", padding: 20}}>
                        <h2>Заполнение нового департамента</h2>
                        <form onSubmit={addDepartment}>

                            <input className="login__input" type="text" value={departmentTitle} onChange={(i) => setDepartmentTitle(i.target.value)}/>
                            <h5>Родительский департамент</h5>
                            <select name="add-select" className="select-uni" onChange={(v) => {
                                if(v.target.value === "Без родителя"){
                                    setParentDepartment(null);
                                    return;
                                }
                                setParentDepartment(v.target.value)
                            }}>
                                <option>Без родителя</option>
                                {
                                    tableData.map((item) =>
                                        <option selected={checkId(item.id)} value={item.id}>{item.title}</option>
                                    )
                                }
                            </select>
                            <button type="submit" className='login__button' style={{marginLeft: 15}}>Добавить</button>
                        </form>
                        <br/>
                        {
                            wasSent &&
                                <h1>Форма была отправлена!</h1>
                        }
                    </div>
                        <br/>
                        <form style={{border: "1px solid black", padding: 20}} onSubmit={deleteDepartment}>
                            <h2>Удалить департамент</h2>
                            <select name="delete-department" className="select-uni" onChange={(v) => setDeletedDepartment(v.target.value)}>
                                {
                                    allDepartments.map((item) =>
                                        <option selected={checkId(item.id)} value={item.id}>{item.title}</option>
                                    )
                                }
                            </select>
                            <button type="submit" className='login__button' style={{marginLeft: 15}}>Удалить</button>
                        </form>
                    </>
            }
            <p className={c.homeText}>Структура</p>

            <MyTable page="department" tableData={tableData}/>
        </div>
    );
};

export default Home;