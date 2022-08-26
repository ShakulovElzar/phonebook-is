import React, {useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {AdminContext} from "../context";

const ProfcomPostPage = () => {
    const {isAdmin} = useContext(AdminContext);
    const params = useParams();

    const [toggleEditorClass, setToggleEditorClass] = useState(false);
    return (
        <div className='page-body'>
            {
                isAdmin &&
                <div style={{color: "black"}}>
                    <Button
                        variant={toggleEditorClass ? "outlined" : "contained"}
                        onClick={() => {
                            if (toggleEditorClass) {
                                setToggleEditorClass(false);
                            } else if (!toggleEditorClass) {
                                setToggleEditorClass(true);
                            }
                        }}
                        style={{marginLeft: "80%", width: 250}}
                    >Открыть редактор текста</Button>
                    <div style={toggleEditorClass ? {display: "block"} : {display: "none"}}>
                        {/*<Editor textId={textId} id={params.id} getData={getData} page="profcom"/>*/}
                    </div>
                </div>
            }
            <h1>ProfcomPostPage number {parseInt(params.id) + 1}</h1>
        </div>
    );
};

export default ProfcomPostPage;