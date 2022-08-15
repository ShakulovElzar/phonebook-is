import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import c from './MyTable.module.css';
import axios from 'axios';

const MyTable = ({tableData, page}) => {
    const navigate = useNavigate()

    const uptadeViews = (pageIndex, views) => {
        let token = sessionStorage.getItem("token")
        axios.put(
            `http://10.200.24.103:8089/department/update/${pageIndex}/`,
            { headers: {
                'X-CSRFToken' : token
            } }, 
            {
            "views": views + 1
            }
        )
    }

    return (
        <div>
            <table className={c.table}>
                <thead>
                    <tr className={c.headRow}>
                        <th className={c.headBox}>Заголовок</th>
                        <th className={c.headBox}>Просмотры</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        tableData.map((i, index) => 
                            <tr className={c.bodyRow} key={index}>
                                <td key={index + 1} className={c.bodyRowTitle} onClick={() => {
                                    navigate(`/${page}/${index}`)
                                    let views = tableData[index].views
                                    uptadeViews(index, views)
                                }}>
                                    {i.title}
                                </td>
                                <td className={c.bodyRowViews}>{i.views}</td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    );
};

export default MyTable;