import React, {useEffect, useState} from 'react';
import MTable from "../components/UI/MaterialTable/MTable";
import axios from "axios";

const Journal = () => {
    const [headers] = useState([
        "По причине",
        "ФИО",
        "Должность",
        "Отпросился у",
    ]);

    const [stuff, setStuff] = useState([]);
    useEffect(() => {
        axios.get("http://10.200.24.103:8089/journal/", {headers: {"Authorization": `Bearer ${localStorage.getItem("atoken")}`}}).then((t) => setStuff(t.data))
    }, []);

    return (
        <div className='page-body'>
            <h2 style={{color: "#000"}}>Журнал: </h2>
            <MTable image={false} headers={headers} bodies={stuff}/>
        </div>
    );
};

export default Journal;