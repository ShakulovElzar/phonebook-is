import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import MTable from "../components/UI/MaterialTable/MTable";

const NpaPostPage = () => {
    const params = useParams();
    const [pageData, setPageData] = useState([]);
    const [categories, setCategories] = useState([]);

    const getData = async () => {
        axios.get(`http://10.200.24.103:8089/npa/${params.id}`, {headers: {
            Authorization: `Bearer ${localStorage.getItem("atoken")}`
        }}).then((t) => {
            setPageData(t.data);
            setCategories(t.data.categories);
        })

    };

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className='page-body'>
            <h1>{pageData.title}</h1>
            <MTable
                headers={[
                    "Должность",
                    "ФИО",
                    "Телефон",
                    "Города/Область/Районы"
                ]}
                bodies={categories}

            />
        </div>
    );
};

export default NpaPostPage;