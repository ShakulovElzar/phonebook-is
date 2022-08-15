import React from 'react';
import MyTable from '../components/UI/MyTablet/MyTable';
import c from './pages.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {
    // table data fetching
    const [tableData, setTableData] = useState([])
    const getData = async () => {
        const response = await axios.get("http://10.200.24.103:8089/department/")
        const parentData = []

        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].parent === null) {
                parentData.push(response.data[i])
            }
        }
        setTableData(parentData)
    }
    useEffect(() =>{
        getData()
    }, [])


    return (
        <div className="home-body">
            <p className={c.homeText}>Структура</p>

            <MyTable page="departments" tableData={tableData}/>
        </div>
    );
};

export default Home;