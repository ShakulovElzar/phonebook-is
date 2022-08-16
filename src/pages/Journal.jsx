import React, {useState} from 'react';
import MTable from "../components/UI/MaterialTable/MTable";

const Journal = () => {
    const [headers, setHeaders] = useState([
        "Фото",
        "ФИО",
        "Должность",
        "По причине",
        "Отпросился у",
        "Внут.АТС",
        "Гор.АТС",
        "E-MAIL",
        "КАБИНЕТ",
    ]);

    const [stuff, setStuff] = useState([
        ["https://picsum.photos/130/180", "Сарбанова Анжелика Николаевна", "Заведующий отделом", "Болезнь", "у кого-то", "1112", "62-53-13", "a.sarbanova@minfin.kg", "213"],
        ["https://picsum.photos/130/180", "Шаршенова Токтобубу Джолдошовна", "Главный специалист", "Болезнь", "у кого-то", "1121", "62-53-13", "t.sharshenova@minfin.kg", "219"],
        ["https://picsum.photos/130/180", "Сарбанова Анжелика Николаевна", "Заведующий отделом", "Болезнь", "у кого-то", "1112", "62-53-13", "a.sarbanova@minfin.kg", "213"],
        ["https://picsum.photos/130/180", "Шаршенова Токтобубу Джолдошовна", "Главный специалист", "Болезнь", "у кого-то", "1121", "62-53-13", "t.sharshenova@minfin.kg", "219"],
        ["https://picsum.photos/130/180", "Сарбанова Анжелика Николаевна", "Заведующий отделом", "Болезнь", "у кого-то", "1112", "62-53-13", "a.sarbanova@minfin.kg", "213"],
        ["https://picsum.photos/130/180", "Шаршенова Токтобубу Джолдошовна", "Главный специалист", "Болезнь", "у кого-то", "1121", "62-53-13", "t.sharshenova@minfin.kg", "219"],
        ["https://picsum.photos/130/180", "Сарбанова Анжелика Николаевна", "Заведующий отделом", "Болезнь", "у кого-то", "1112", "62-53-13", "a.sarbanova@minfin.kg", "213"],
        ["https://picsum.photos/130/180", "Шаршенова Токтобубу Джолдошовна", "Главный специалист", "Болезнь", "у кого-то", "1121", "62-53-13", "t.sharshenova@minfin.kg", "219"],
    ]);

    return (
        <div className='page-body'>
            <h2 style={{color: "#000"}}>Журнал: </h2>
            <MTable headers={headers} bodies={stuff} journalInfo={true}/>
        </div>
    );
};

export default Journal;