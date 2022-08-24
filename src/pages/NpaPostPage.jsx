import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import {AdminContext} from "../context";
import Button from "@mui/material/Button";
import Editor from "../components/Editor/Editor";

const NpaPostPage = () => {
    const {isAdmin} = useContext(AdminContext);
    const params = useParams();
    const [pageData, setPageData] = useState([]);

    const getData = async () => {
        axios.get(`http://10.200.24.103:8089/npa/${params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("atoken")}`
            }
        }).then((t) => {
            setPageData(t.data);
            if (t.data.categores[0] !== undefined) {
                document.getElementById("post-data").innerHTML = JSON.stringify(t.data.categores[0].text)
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
                        style={{marginLeft: "80%", width: 250}}
                    >Открыть редактор текста</Button>
                    <div style={toggleEditorClass ? {display: "block"} : {display: "none"}}><Editor id={params.id} getData={getData}/></div>
                </div>
            }
            <h1>{pageData.title}</h1>
            <div id="post-data"></div>
        </div>
    );
};

export default NpaPostPage;