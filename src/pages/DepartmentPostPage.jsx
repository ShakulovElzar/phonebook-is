import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MTable from '../components/UI/MaterialTable/MTable';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

const DepartmentPostPage = () => {
    const params = useParams();
    const [depName, setDepName] = useState("");
    // an example of data
    const postData = {
        bossData: {
            image: "..\images\atcimage.jpeg",
            position: "Начальник управления",
            fullName: "Бакетаев Алмаз Кушбекович",
            internalATC: 1000,
            number: "66-04-04",
            email: "t.aidarbekov@minfin.kg"
        },
        innerDepartments: [
            {
                title: "Отдел консолидации государственного бюджета",
                stuff: [
                    // ["https://picsum.photos/130/180", "", "", "", "", "", ""],
                    ["https://picsum.photos/70/100", "Сарбанова Анжелика Николаевна", "Заведующий отделом", "1112", "62-53-13", "a.sarbanova@minfin.kg", "213"],
                    ["https://picsum.photos/70/100", "Шаршенова Токтобубу Джолдошовна", "Главный специалист", "1121", "62-53-13", "t.sharshenova@minfin.kg", "219"],
                ]
            },
            {
                title: "Отдел методологии, анализа бюджета и оценки фискальных рисков",
                stuff: [
                    ["https://picsum.photos/70/100", "Сарбанова Анжелика Николаевна", "Заведующий отделом", "1112", "62-53-13", "a.sarbanova@minfin.kg", "213"],
                    ["https://picsum.photos/70/100", "Шаршенова Токтобубу Джолдошовна", "Главный специалист", "1121", "62-53-13", "t.sharshenova@minfin.kg", "219"],
                ]
            },
            {
                title: "Отдел среднесрочной политики и программного бюджетирования",
                stuff: [
                    ["https://picsum.photos/70/100", "Сарбанова Анжелика Николаевна", "Заведующий отделом", "1112", "62-53-13", "a.sarbanova@minfin.kg", "213"],
                    ["https://picsum.photos/70/100", "Шаршенова Токтобубу Джолдошовна", "Главный специалист", "1121", "62-53-13", "t.sharshenova@minfin.kg", "219"],
                ]
            }
        ]
    };

    const [headers, setHeaders] = useState([
        "Фото",
        "ФИО",
        "Должность",
        "Внут.АТС",
        "Гор.АТС",
        "E-MAIL",
        "КАБИНЕТ",
    ]);
    
    const getPostData = async () => {
        const response = await axios.get(`http://10.200.24.103:8089/department/${params.id}/`);
        setDepName(response.data.title);
    };

    useEffect(() => {
        getPostData()
    }, []);


    
    return (
        <div className='page-body'>
            <h1 style={{color: "black"}}>{depName}</h1>
            <p>Печать(пусто)</p>
            <br/>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell align='right'>
                                {/* <img src={postData.bossData.image} alt="фото начальника" /> */}
                                <img src='https://picsum.photos/130/180' alt="фото начальника" />
                            </TableCell>
                            <TableCell>
                                <h3>{postData.bossData.position}</h3>
                                <p>{postData.bossData.fullName}</p>
                                <p><strong>Внут.АТС:</strong> {postData.bossData.internalATC}</p>
                                <p><strong>Тел.:</strong> {postData.bossData.number}</p>
                                <p><strong>e-mail:</strong> {postData.bossData.email}</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {
                postData.innerDepartments.map((dep, index) => <div key={index} className='deparment__block'>
                    <h2>{dep.title}</h2>
                    <MTable headers={headers} bodies={dep.stuff}/>
                </div>)
            }

        </div>
    );
};

export default DepartmentPostPage;