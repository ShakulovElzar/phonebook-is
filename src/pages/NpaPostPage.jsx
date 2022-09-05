import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import {AdminContext} from "../context";
import Button from "@mui/material/Button";
import Editor from "../components/Editor/Editor";

const NpaPostPage = () => {
    const {isAdmin} = useContext(AdminContext);
    const params = useParams();
    const [pageTitle, setTitle] = useState([]);
    const [pageText, setPageText] = useState();
    const [textId, setTextId] = useState();

    const getData = async () => {
        axios.get(`http://10.200.24.103:8089/npa/${params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("atoken")}`
            }
        }).then((t) => {
            setTitle(t.data.title);
            if (t.data.categores[0] !== undefined) {
                setPageText(t.data.categores[0].text);
                setTextId(t.data.categores[0].id);
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
                        style={{width: 250}}
                    >Открыть редактор текста</Button>
                    <div style={toggleEditorClass ? {display: "block"} : {display: "none"}}>
                        <Editor textId={textId} setToggleEditorClass={setToggleEditorClass} id={params.id} getData={getData} page="npa"/>
                    </div>
                </div>
            }
            <br/>
            <hr/>
            <h1>{pageTitle}</h1>
            <div dangerouslySetInnerHTML={{__html: pageText}} className='npa-post__page'></div>
        </div>
    );
};

export default NpaPostPage;