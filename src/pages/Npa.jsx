import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import MyTable from '../components/UI/MyTablet/MyTable';

const Npa = () => {
    const [tableData, setTableData] = useState([])

    const getData = async () => {
        const response = await axios.get("http://10.200.24.103:8089/npa/")
        setTableData(response.data)
    }

    useEffect(() =>{
        getData()
    }, [])
    
    return (
        <div className='page-body'>
            <MyTable page="npa" tableData={tableData}/>
        </div>
    );
};

export default Npa;