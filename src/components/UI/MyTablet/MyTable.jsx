import React from 'react';
import { useNavigate } from 'react-router-dom';
import c from './MyTable.module.css';

const MyTable = ({tableData, page}) => {
    const navigate = useNavigate();

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
                                    navigate(`/${page}/${(i.id)}`)
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