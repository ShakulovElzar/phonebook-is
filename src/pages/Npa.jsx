import React, {useContext, useRef} from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import MyTable from '../components/UI/MyTablet/MyTable';
import {AdminContext} from "../context";

const Npa = () => {
    const {isSuperAdmin, isAdmin} = useContext(AdminContext);
    const [npaTitle, setNpaTitle] = useState("");
    const [wasSent, setWasSent] = useState(false);
    const targetedNpa = useRef();
    const deletedNpa = useRef();

    const [tableData, setTableData] = useState([]);
    const getData = async () => {
        const response = await axios.get("http://10.200.24.103:8089/npa/");
        setTableData(response.data);
    };

    useEffect(() =>{
        getData()
    }, []);

    const addNpa = (event) => {
        event.preventDefault();
        axios.post("http://10.200.24.103:8089/npa/create/",
            {
                title: npaTitle
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("atoken")}`
                }
            });
        setWasSent(true);
        setTimeout(() => {
            setWasSent(false)
        }, 3000)
        setTimeout(() => getData(), 1000)
    };

    const deleteNpa = (event) => {
        event.preventDefault();
        axios.delete(`http://10.200.24.103:8089/npa/delete/${deletedNpa.current.value}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("atoken")}`
            }
        });
        setTimeout(() => getData(), 1000)
    };

    const updateNpa = (event) => {
        event.preventDefault();
        axios.patch(`http://10.200.24.103:8089/npa/update/${targetedNpa.current.value}/`,
            {
                title: npaTitle,
                id: targetedNpa.current.value,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("atoken")}`
                }
            })
        setTimeout(() => getData(), 1000)
    }

    const checkId =(id) => {
        if(id === 1) {
            return "selected"
        }   else {
            return false
        }
    };

    let [showAdd, setShowAdd] = useState(false)
    let [showDel, setShowDel] = useState(false)
    let [showUpd, setShowUpd] = useState(false)
    return (
        <div className='page-body'>
            {
                (isSuperAdmin || isAdmin) &&
                    <>
                        <div className='admin-form__wrapper'>
                            <h2 style={{display: "inline-block"}}>Заполнение нового НПА</h2>
                            <img onClick={() => {
                                if (showAdd){
                                    setShowAdd(false)
                                } else {
                                    setShowAdd(true)
                                }
                            }} className='show-arrow' src="https://w7.pngwing.com/pngs/551/108/png-transparent-arrow-illustration-arrow-icon-right-arrow-angle-web-design-internet-thumbnail.png" alt=""/>
                            <form onSubmit={addNpa} style={{display: showAdd ? "block" : "none"}}>
                                <input placeholder="Название НПА" className="login__input" type="text" value={npaTitle} onChange={(i) => setNpaTitle(i.target.value)}/>
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
                            <h2 style={{display: "inline-block"}}>Удалить НПА</h2>
                            <img onClick={() => {
                                if (showDel){
                                    setShowDel(false)
                                } else {
                                    setShowDel(true)
                                }
                            }} className='show-arrow' src="https://w7.pngwing.com/pngs/551/108/png-transparent-arrow-illustration-arrow-icon-right-arrow-angle-web-design-internet-thumbnail.png" alt=""/>

                            <form  onSubmit={deleteNpa} style={{display: showDel ? "block" : "none"}}>
                                <select ref={targetedNpa} name="delete-department" className="select-uni">
                                    {
                                        tableData.map((item, index) =>
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
                            <h2 style={{display: "inline-block"}}>Изменить НПА</h2>
                            <img onClick={() => {
                                if (showUpd) {
                                    setShowUpd(false)
                                } else {
                                    setShowUpd(true)
                                }
                            }} className='show-arrow' src="https://w7.pngwing.com/pngs/551/108/png-transparent-arrow-illustration-arrow-icon-right-arrow-angle-web-design-internet-thumbnail.png" alt=""/>


                            <form onSubmit={updateNpa} style={{display: showUpd ? "block" : "none"}}>

                                <input className="login__input" placeholder="Новое название департамента" type="text" value={npaTitle} onChange={(i) => setNpaTitle(i.target.value)}/>

                                <h5>Выберите НПА</h5>

                                <select ref={deletedNpa} name="delete-department" className="select-uni">
                                    {
                                        tableData.map((item, index) =>
                                            <option key={index} defaultValue={checkId(item.id)} value={item.id} >{item.title}</option>
                                        )
                                    }

                                </select>
                                <button type="submit" className='login__button' style={{marginLeft: 15}}>Изменить</button>
                            </form>
                        </div>
                    </>
            }
            <h1>НПА</h1>
            <MyTable page="npa" tableData={tableData}/>
        </div>
    );
};

export default Npa;