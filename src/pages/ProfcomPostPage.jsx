import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {AdminContext} from "../context";
import axios from "axios";
import Editor from "../components/Editor/Editor";

const ProfcomPostPage = () => {
    const {isAdmin} = useContext(AdminContext);
    const params = useParams();
    const [pageText, setPageText] = useState();

    const getData = async () => {
        console.log("here");
        axios.get(`http://10.200.24.103:8089/profcom/${params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("atoken")}`
            }
        }).then((t) => {
            if (t.status === 200) {
                setPageText(t.data.text);
            }
        })
    };
    useEffect(() => {
        getData();

    }, []);

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
                        style={{marginLeft: "75%", width: 250}}
                    >Открыть редактор текста</Button>
                    <div style={toggleEditorClass ? {display: "block"} : {display: "none"}}>
                        <Editor
                            textId={params.id}
                            setToggleEditorClass={setToggleEditorClass}
                            id={params.id}
                            page="profcom"
                        />
                    </div>
                </div>
            }
            <br/>
            <hr/>
            <h1>Статья:</h1>
            <div dangerouslySetInnerHTML={{__html: pageText}}></div>
        </div>
    );
};

export default ProfcomPostPage;