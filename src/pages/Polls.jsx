import React, {useContext} from 'react';
import {RoleContext} from "../context";

const Quizzes = () => {
    const { hasRole } = useContext(RoleContext);

    return (
        <div className='page-body'>
            {
                hasRole === "QUIZ" &&
                    <h1>Create
                    </h1>
            }
            <h1>Опросы</h1>
        </div>
    );
};

export default Quizzes;