import React, {useContext, useEffect, useRef, useState} from 'react';
import MTable from "../components/UI/MaterialTable/MTable";
import axios from "axios";
import {AdminContext} from "../context";

const Journal = () => {
    const {isAdmin, isSuperAdmin} = useContext(AdminContext);
    const [users, setUsers] = useState([]);
    const [reasonText, setReasonText] = useState("");
    const fullname = useRef();
    const jobtitle = useRef();
    const sendFullname = useRef();

    const [headers] = useState([
        "По причине",
        "ФИО",
        "Должность",
        "Отпросился у",
    ]);
    const [stuff, setStuff] = useState([]);
    useEffect(() => {
        axios.get("http://10.200.24.103:8089/journal/", {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).then((t) => setStuff(t.data));
        axios.get('http://10.200.24.103:8089/account/', {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).then((t) => setUsers(t.data));
    }, []);

    let [showAdd, setShowAdd] = useState(false);
    let [showDel, setShowDel] = useState(false);
    let [showUpd, setShowUpd] = useState(false);

    const checkId =(id) => {
        if(id === 1) {
            return "selected"
        }   else {
            return false
        }
    };

    const addUser = (event) => {
        event.preventDefault();
        axios.post("http://10.200.24.103:8089/journal/create/",{
            reason: reasonText,
            fullname: fullname.current.value,
            jobtitle: jobtitle.current.value,
            whom_asked: sendFullname.current.value
        }, {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}})
    };

    return (
        <div className='page-body'>

            {
                (isSuperAdmin || isAdmin) &&
                    <>
                        <div className="admin-form__wrapper">
                            <h2>Добавить</h2>
                            <img onClick={() => {
                            if (showAdd){
                                setShowAdd(false)
                            } else {
                                setShowAdd(true)
                            }
                        }} className='show-arrow' src="https://w7.pngwing.com/pngs/551/108/png-transparent-arrow-illustration-arrow-icon-right-arrow-angle-web-design-internet-thumbnail.png" alt=""/>

                            <form style={{display: showAdd ? "block" : "none"}} onSubmit={addUser}>
                                <input type="text" className="login__input" placeholder="Причина" value={reasonText} onChange={t => setReasonText(t.target.value)}/>
                                <h3>Выберите человека</h3>

                                <select ref={fullname} name="add-select" className="select-uni">
                                    {
                                        users.map((item, index) =>
                                            <option key={index} value={item.id}>{item.fullname}</option>
                                        )
                                    }
                                </select>
                                <h3>Выберите должность человека</h3>

                                <select ref={jobtitle} name="add-select" className="select-uni">
                                    {
                                        users.map((item, index) =>
                                            <option key={index} value={item.id}>{item.jobtitle}</option>
                                        )
                                    }
                                </select>
                                <h3>Выберите человека, у которого он отпросился</h3>
                                <select ref={sendFullname} name="add-select" className="select-uni">
                                    {
                                        users.map((item, index) =>
                                            <option key={index} defaultValue={checkId(item.id)} value={item.id} >{item.fullname}</option>
                                        )
                                    }
                                </select>
                                <button type="submit">Добавить</button>
                            </form>
                        </div>
                    </>
            }

            <h2 style={{color: "#000"}}>Журнал: </h2>
            <MTable image={false} headers={headers} bodies={stuff}/>
        </div>
    );
};

export default Journal;