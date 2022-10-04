import React, { useContext, useState } from "react";
import { AdminContext, RoleContext } from "../context";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LeafPoll } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";

const Polls = () => {
  const { hasRole } = useContext(RoleContext);
  const { isAdmin } = useContext(AdminContext);
  const [toOpen, setToOpen] = useState(false);
  const samplePoll = {
    question: "sadasdasdas",
    choices: [
      {
        id: 0,
        text: "asdasdsad",
        votes: 1,
        percentage: 100
      },
      {
        id: 1,
        text: "asdsadasd",
        votes: 0,
        percentage: 0
      },
      {
        id: 2,
        text: "dasd",
        votes: 0,
        percentage: 0
      }
    ]
  };
  const [openChoices, setOpenChoices] = useState(false);
  const [pollData, setPollData] = useState([samplePoll]);
  const [questionText, setQuestionText] = useState("");
  const [choiceText, setChoiceText] = useState("");
  const [virtualOptions, setVirtualOptions] = useState([]);
  const [toggleOptionAdd, setToggleOptionAdd] = useState(false);
  const pollBody = { id: 0, text: "", votes: 0 };

  const addQuestion = () => {
    console.log("dasdasd");
  };
  const addChoice = () => {
    console.log("dasdaaaaa");
  };
  const add = () => {
    if (questionText.length === 0 || virtualOptions.length <= 1) {
      virtualOptions.length <= 1
        ? alert("Введите больше одной опции")
        : alert("Введите корректный вопрос ");
      setQuestionText("");
      setVirtualOptions([]);
      setToOpen(false);
      setOpenChoices(false);
      return;
    }

    setPollData([
      ...pollData,
      { question: questionText, choices: virtualOptions }
    ]);
    setQuestionText("");
    setVirtualOptions([]);

    setToOpen(false);
    setOpenChoices(false);
  };

  return (
    <div className="page-body">
      {(hasRole === "QUIZ" || isAdmin) && (
        <React.Fragment>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant={toOpen ? "outlined" : "contained"}
              onClick={() => {
                setToOpen(!toOpen);
                setOpenChoices(false);
              }}
            >
              Добавить
            </Button>
          </div>
          {toOpen && (
            <div className="addPoll__wrapper">
              <div className="addPoll__body">
                <h3>Название опроса</h3>
                <TextField
                  label="Вопрос"
                  sx={{ width: 400 }}
                  value={questionText}
                  variant="standard"
                  onChange={t => setQuestionText(t.target.value)}
                />
                <br />
                <br />
                <Button
                  variant={openChoices ? "outlined" : "contained"}
                  onClick={() => {
                    addQuestion();
                    setOpenChoices(!openChoices);
                    setToOpen(!toOpen);
                  }}
                >
                  Добавить опции
                </Button>
                <br />
                <br />
              </div>
            </div>
          )}
          {openChoices && (
            <div>
              <h2>Структура опроса:</h2>
              <h3>Вопрос: {questionText}</h3>
              {virtualOptions.map((item, index) => (
                <h3 key={index}>
                  Опция {index + 1}: {item.text}
                </h3>
              ))}
              <div>
                <TextField
                  label="Текст"
                  variant="standard"
                  sx={{ width: 400 }}
                  value={choiceText}
                  onChange={t => setChoiceText(t.target.value)}
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={() => {
                    setToggleOptionAdd(true);
                    addChoice();
                    pollBody.text = choiceText;
                    pollBody.id = virtualOptions.length;
                    setVirtualOptions([...virtualOptions, pollBody]);
                    setChoiceText("");
                    setTimeout(() => setToggleOptionAdd(false), 2000);
                  }}
                >
                  Добавить опцию
                </Button>
                {toggleOptionAdd && (
                  <span
                    style={{
                      marginLeft: 15,
                      color: "green"
                    }}
                  >
                    Опция добавлена!
                  </span>
                )}
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end"
                  }}
                >
                  <Button variant="contained" onClick={add}>
                    Добавить опрос!
                  </Button>
                </div>
              </div>
            </div>
          )}
          <br />
          <hr />
        </React.Fragment>
      )}
      <h1>Опросы:</h1>
      <div className="polls__wrapper">
        {pollData.map((item, index) => (
          <PollBody pollData={item} key={index} />
        ))}
      </div>
    </div>
  );
};

// Persistent data array (typically fetched from the server)
// const resData = [];

// Object keys may vary on the poll type (see the 'Theme options' table below)
const customTheme = {
  textColor: "white",
  mainColor: "#9e9e9e",
  backgroundColor: "rgb(111,111,111)",
  alignment: "start"
};

function onVote(item, results) {
  // Here you probably want to manage
  // and return the modified data to the server.
  console.log(item, results);
}

const PollBody = ({ pollData }) => {
  return (
    <div className="poll__wrapper">
      <LeafPoll
        type="multiple"
        question={pollData.question}
        results={pollData.choices}
        theme={customTheme}
        onVote={onVote}
        isVoted={false}
      />
    </div>
  );
};

// data output after voting
// [
//     {
//         "id": 0,
//         "text": "Answer 1",
//         "votes": 1,
//         "percentage": 100
//     },
//     {
//         "id": 1,
//         "text": "Answer 2",
//         "votes": 0,
//         "percentage": 0
//     },
//     {
//         "id": 2,
//         "text": "Answer 3",
//         "votes": 0,
//         "percentage": 0
//     }
// ]

export default Polls;
