import React, {useContext, useRef} from 'react';
import MyTable from '../components/UI/MyTablet/MyTable';
import c from './pages.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {AdminContext} from "../context";

const Home = () => {
    const {isSuperAdmin} = useContext(AdminContext);
    const parentDepartment = useRef();
    const targetDepartment = useRef();
    const parentRefDepartment = useRef();
    const deletedDepartment = useRef();
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
        let localParent = parentDepartment.current.value;
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
        axios.delete(`http://10.200.24.103:8089/department/delete/${deletedDepartment.current.value}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("atoken")}`
            }
        });
        setTimeout(() => getData(), 1000)
    };
    const updateDepartment = (event) => {
        event.preventDefault();
        let localParent = parentRefDepartment.current.value;
        if(localParent === "Без родителя"){
            localParent = null;
        }
        axios.patch(`http://10.200.24.103:8089/department/update/${targetDepartment.current.value}/`,
            {
                title: departmentTitle,
                id: targetDepartment.current.value,
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
    let [showAdd, setShowAdd] = useState(false);
    let [showDel, setShowDel] = useState(false);
    let [showUpd, setShowUpd] = useState(false);

    return (
        <div className="page-body">
            {
                isSuperAdmin &&
                    <>
                        {/*add department*/}
                        <div className='admin-form__wrapper'>
                        <h2 style={{display: "inline-block"}}>Заполнение нового департамента</h2>
                        <img onClick={() => {
                            if (showAdd){
                                setShowAdd(false)
                            } else {
                                setShowAdd(true)
                            }
                        }} className='show-arrow' src="https://w7.pngwing.com/pngs/551/108/png-transparent-arrow-illustration-arrow-icon-right-arrow-angle-web-design-internet-thumbnail.png" alt=""/>
                        <form onSubmit={addDepartment} style={{display: showAdd ? "block" : "none"}}>

                            <input placeholder="Название департамента" className="login__input" type="text" value={departmentTitle} onChange={(i) => setDepartmentTitle(i.target.value)}/>
                            <h5>Родительский департамент</h5>
                            <select ref={parentDepartment} name="add-select" className="select-uni">
                                <option value={null}>Без родителя</option>
                                {
                                    tableData.map((item, index) =>
                                        <option key={index} defaultValue={checkId(item.id)} value={item.id} >{item.title}</option>
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
                        {/*delete department*/}
                        <div className='admin-form__wrapper'>
                            <h2 style={{display: "inline-block"}}>Удалить департамент</h2>
                            <img onClick={() => {
                                if (showDel){
                                    setShowDel(false)
                                } else {
                                    setShowDel(true)
                                }
                                }} className='show-arrow' src="https://w7.pngwing.com/pngs/551/108/png-transparent-arrow-illustration-arrow-icon-right-arrow-angle-web-design-internet-thumbnail.png" alt=""/>

                                <form  onSubmit={deleteDepartment} style={{display: showDel ? "block" : "none"}}>
                                <select ref={deletedDepartment} name="delete-department" className="select-uni">
                                    {
                                        allDepartments.map((item, index) =>
                                            <option key={index} defaultValue={checkId(item.id)} value={item.id}>{item.title}</option>
                                        )
                                    }
                                </select>
                                <button type="submit" className='login__button' style={{marginLeft: 15}}>Удалить</button>
                            </form>
                        </div>

                        <br/>
                        {/*update department*/}
                        <div className='admin-form__wrapper'>
                            <h2 style={{display: "inline-block"}}>Изменить департамент</h2>
                            <img onClick={() => {
                                if (showUpd) {
                                    setShowUpd(false)
                                } else {
                                    setShowUpd(true)
                                }
                            }} className='show-arrow' src="https://w7.pngwing.com/pngs/551/108/png-transparent-arrow-illustration-arrow-icon-right-arrow-angle-web-design-internet-thumbnail.png" alt=""/>
                            <form onSubmit={updateDepartment} style={{display: showUpd ? "block" : "none"}}>
                                <input className="login__input" placeholder="Новое название департамента" type="text" value={departmentTitle} onChange={(i) => setDepartmentTitle(i.target.value)}/>
                                <h5>Выберите департамент</h5>
                                <select ref={targetDepartment} name="delete-department" className="select-uni">
                                    {
                                        allDepartments.map((item, index) =>
                                            <option key={index} defaultValue={checkId(item.id)} value={item.id} >{item.title}</option>
                                        )
                                    }

                                </select>
                                <h5>Новый родительский департамент</h5>
                                <select ref={parentRefDepartment} name="add-select" className="select-uni">
                                    {
                                        tableData.map((item, index) =>
                                            <option key={index} defaultValue={checkId(item.id)} value={item.id}>{item.title}</option>
                                        )
                                    }
                                    <option value={null}>Без родителя</option>
                                </select>



                                <button type="submit" className='login__button' style={{marginLeft: 15}}>Изменить</button>
                            </form>
                        </div>
                    </>
            }

            <p className={c.homeText}>Структура</p>

            <MyTable page="department" tableData={tableData}/>
        </div>
    );
};

export default Home;