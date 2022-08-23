import React, {useState} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, {formats, modules} from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import axios from 'axios';
import Button from "@mui/material/Button";

function Editor(props) {
    const [userText, setUserText] = useState("");
    const onDescription = (e) => {
      setUserText(e);
      console.log(e)
    };
    const [isError, setError] = useState(null);
    const addDetails = async (event) => {
        try {
            event.preventDefault();
            event.persist();
            if (userText < 50) {
                setError('Required, Add description minimum length 50 characters');
                return;
            }
            axios.post("http://10.200.24.103:8089/npainfo/news/create/", {
                text: userText,
                category: props.id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("atoken")}`
                }
            })
            .then(res => {
                if (res.data.success === true) {
                    setTimeout(() => props.getData(), 500)
                }
            })
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <div className="App">
                <div>
                    <div className="row">
                        <form onSubmit={addDetails} className="update__forms">
                            <div className="form-row">
                                <br/>
                                <div className="form-group editor" style={{maxWidth: 1050}}>
                                    <h3 className="font-weight-bold">Текст: </h3>
                                    <EditorToolbar toolbarId={'t1'}/>
                                    <ReactQuill
                                        theme="snow"
                                        value={userText}
                                        onChange={(e) => onDescription(e)}
                                        placeholder={"Write something awesome..."}
                                        modules={modules('t1')}
                                        formats={formats}
                                    />
                                </div>
                                <br/>
                                {isError !== null && <div className="errors"> {isError} </div>}
                                <Button type="submit" variant="contained" style={{margin: "15px 0"}}> Submit </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Editor;