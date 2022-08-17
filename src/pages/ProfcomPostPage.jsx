import React from 'react';
import {useParams} from "react-router-dom";

const ProfcomPostPage = () => {
    const params = useParams();
    return (
        <div className='page-body'>
            <h1>ProfcomPostPage number {parseInt(params.id) + 1}</h1>
        </div>
    );
};

export default ProfcomPostPage;