import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdminContext, RoleContext } from "../context";
import MTable from "../components/UI/MaterialTable/MTable";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useFetching } from "../hooks/useFetching";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ paddingTop: 1 }}>{children}</Box>}
    </div>
  );
}

const Support = () => {
  const { isAdmin } = useContext(AdminContext);
  const { hasRole } = useContext(RoleContext);
  const [reportIssue, setReportIssue] = useState(1);
  const [reportText, setReportText] = useState("");
  const [reportDestination, setReportDestination] = useState(1);
  const [author, setAuthor] = useState();
  const headers = ["Тип", "Описание", "Для кого", "Автор"];
  if (isAdmin || hasRole === "MANAGER_IT" || hasRole === "IT_SPECIALIST") {
    headers.push("Действия");
  }

  const [value, setValue] = useState();
  const [options, setOptions] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [journalData, setJournalData] = useState([]);
  const [addOptionText, setAddOptionText] = useState("");
  const [deleteOptionItem, setDeleteOptionItem] = useState(0);
  const [updateOptionItem, setUpdateOptionItem] = useState(0);
  const [addWorkerText, setAddWorkerText] = useState("");
  const [deleteWorkerItem, setDeleteWorkerItem] = useState(0);
  const [updateWorkerItem, setUpdateWorkerItem] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const getJournalData = async () => {
    let user = localStorage.getItem("user");
    axios
      .get("http://10.200.24.103:8089/help/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("atoken")}`
        }
      })
      .then(t => {
        t.data.sort((a, b) => b["status"] - a["status"]).reverse();
        setJournalData(t.data);
      });
    axios.get(`http://10.200.24.103:8089/account/?search=${user}`).then(res => {
      setAuthor(res.data[0].id);
    });
  };
  const getOptionsData = () => {
    useFetching({}, setOptions, "help/option/", "get", setErrorMessage);
  };
  const getWorkersData = () => {
    useFetching({}, setWorkers, "help/worker/", "get", setErrorMessage);
  };
  const sendReport = event => {
    event.preventDefault();
    useFetching(
      {
        choice: reportIssue,
        description: reportText,
        for_whom: reportDestination,
        author
      },
      "",
      "help/create/",
      "post",
      setErrorMessage
    );
    setReportText("");
    setTimeout(() => {
      getJournalData();
    }, 500);
  };
  useEffect(() => {
    getOptionsData();
    getWorkersData();
    getJournalData();
  }, []);

  const addOption = event => {
    event.preventDefault();
    useFetching(
      {
        choice: addOptionText
      },
      "",
      "help/option/create/",
      "post",
      setErrorMessage
    );
    setTimeout(() => {
      getOptionsData();
    }, 500);
  };
  const deleteOption = event => {
    event.preventDefault();
    useFetching(
      {},
      "",
      `help/option/delete/${deleteOptionItem}/`,
      "delete",
      setErrorMessage
    );
    setTimeout(() => {
      getOptionsData();
    }, 500);
  };
  const updateOption = event => {
    event.preventDefault();
    useFetching(
      {
        choice: addOptionText
      },
      "",
      `help/option/update/${updateOptionItem}/`,
      "patch",
      setErrorMessage
    );
    setTimeout(() => {
      getOptionsData();
    }, 500);
  };
  const addWorker = event => {
    event.preventDefault();
    useFetching(
      {
        workername: addWorkerText
      },
      "",
      "help/worker/create/",
      "post",
      setErrorMessage
    );
    setTimeout(() => {
      getWorkersData();
    }, 500);
  };
  const deleteWorker = event => {
    event.preventDefault();
    useFetching(
      {},
      "",
      `help/worker/delete/${deleteWorkerItem}/`,
      "delete",
      setErrorMessage
    );
    setTimeout(() => {
      getWorkersData();
    }, 500);
  };
  const updateWorker = event => {
    event.preventDefault();
    useFetching(
      {
        workername: addWorkerText
      },
      "",
      `help/worker/update/${updateWorkerItem}/`,
      "patch",
      setErrorMessage
    );
    setTimeout(() => {
      getWorkersData();
    }, 500);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="page-body body-box">
      {(isAdmin || hasRole === "MANAGER_IT" || hasRole === "IT_SPECIALIST") && (
        <div style={{ marginBottom: 25, width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Список заявок" />
                {isAdmin && <Tab label="Управление темами отправки" />}
                {isAdmin && <Tab label="Управление работниками" />}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="admin-form__wrapper">
                <MTable
                  headers={headers}
                  bodies={journalData}
                  showButtons={hasRole}
                  isAdmin={isAdmin}
                  getJournalData={getJournalData}
                />
              </div>
            </TabPanel>
            {isAdmin && (
              <React.Fragment>
                <TabPanel value={value} index={2}>
                  <div className="admin-form__wrapper">
                    <h3>Добавить работника</h3>
                    <form onSubmit={addWorker} style={{ margin: "20px 0px" }}>
                      <TextField
                        sx={{ width: 400 }}
                        variant="outlined"
                        label="Добавить работника"
                        onChange={t => setAddWorkerText(t.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        style={{ marginLeft: 15, marginTop: 5 }}
                      >
                        Добавить
                      </Button>
                    </form>
                    <h3>Удалить работника</h3>
                    <form
                      onSubmit={deleteWorker}
                      style={{ margin: "20px 0px" }}
                    >
                      <FormControl>
                        <InputLabel>Удалить работника</InputLabel>
                        <Select
                          sx={{ width: 350 }}
                          onChange={t => setDeleteWorkerItem(t.target.value)}
                          label="Выбрать работника"
                        >
                          {workers.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.workername}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        style={{ marginLeft: 15, marginTop: 5 }}
                      >
                        Удалить
                      </Button>
                    </form>
                    <h3>Обновить работника</h3>
                    <form
                      style={{ margin: "20px 0px" }}
                      onSubmit={updateWorker}
                    >
                      <TextField
                        sx={{ width: 400 }}
                        style={{ marginRight: 20 }}
                        variant="outlined"
                        label="Новое имя работника"
                        onChange={t => setAddWorkerText(t.target.value)}
                      />
                      <FormControl>
                        <InputLabel>Выбрать работника </InputLabel>
                        <Select
                          sx={{ width: 350 }}
                          onChange={t => setUpdateWorkerItem(t.target.value)}
                          label="Выбрать работника"
                        >
                          {workers.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.workername}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        style={{ marginLeft: 15, marginTop: 5 }}
                      >
                        Изменить
                      </Button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className="admin-form__wrapper">
                    <h3>Добавить опцию</h3>
                    <form onSubmit={addOption} style={{ margin: "20px 0px" }}>
                      <TextField
                        sx={{ width: 400 }}
                        variant="outlined"
                        label="Добавить опцию"
                        onChange={t => setAddOptionText(t.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        style={{ marginLeft: 15, marginTop: 5 }}
                      >
                        Добавить
                      </Button>
                    </form>
                    <h3>Удалить опцию</h3>
                    <form
                      onSubmit={deleteOption}
                      style={{ margin: "20px 0px" }}
                    >
                      <FormControl>
                        <InputLabel>Удалить опцию</InputLabel>
                        <Select
                          sx={{ width: 350 }}
                          onChange={t => setDeleteOptionItem(t.target.value)}
                          label="Выбрать опцию"
                        >
                          {options.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.choice}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        style={{ marginLeft: 15, marginTop: 5 }}
                      >
                        Удалить
                      </Button>
                    </form>
                    <h3>Обновить опцию</h3>
                    <form
                      style={{ margin: "20px 0px" }}
                      onSubmit={updateOption}
                    >
                      <TextField
                        sx={{ width: 400 }}
                        style={{ marginRight: 20 }}
                        variant="outlined"
                        label="Новое название опции"
                        onChange={t => setAddOptionText(t.target.value)}
                      />
                      <FormControl>
                        <InputLabel>Выбрать опцию </InputLabel>
                        <Select
                          sx={{ width: 350 }}
                          onChange={t => setUpdateOptionItem(t.target.value)}
                          label="Выбрать опцию"
                        >
                          {options.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.choice}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        style={{ marginLeft: 15, marginTop: 5 }}
                      >
                        Добавить
                      </Button>
                    </form>
                  </div>
                </TabPanel>
              </React.Fragment>
            )}
          </Box>
        </div>
      )}
      <div className="help__header">
        <span className="help__header-title">Нужна помощь?</span>
        <span className="help__header-description">
          Оставьте своё сообщение и мы вам поможем
        </span>
        <span className="help__header-description">
          В ответ на обращение на вашу почту придет сообщение.
        </span>
      </div>
      <form className="help__form" onSubmit={sendReport}>
        <div className="form__inputs">
          <p className="select-title">Что вам нужно?</p>
          <FormControl>
            <InputLabel>Выберите пункт</InputLabel>
            <Select
              sx={{ width: 400 }}
              onChange={t => setReportIssue(t.target.value)}
              label="Выберите пункт"
            >
              {options.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p className="select-title">Кому:</p>
          <FormControl>
            <InputLabel>Выберите получателя</InputLabel>
            <Select
              sx={{ width: 400 }}
              onChange={t => setReportDestination(t.target.value)}
              label="Выберите получателя"
            >
              {workers.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.workername}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="item-problem">
            <p>Опишите свою проблему</p>
            <TextField
              style={{ marginBottom: 20, width: 400 }}
              id="outlined-multiline-static"
              label="Сообщение"
              multiline
              rows={4}
              value={reportText}
              onChange={el => setReportText(el.target.value)}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{ marginTop: 5, textTransform: "uppercase", marginLeft: 130 }}
        >
          Отправить
        </Button>
      </form>
    </div>
  );
};

export default Support;
// <div className="admin-form__wrapper">
// 	<form onSubmit={deleteReport} style={{ marginTop: 20 }}>
// 		<FormControl>
// 			<InputLabel>
// 				Выбрать заявку
// 			</InputLabel>
// 			<Select sx={{ width: 350 }} onChange={t => setDeletePost(t.target.value)} label="Выбрать заявку">
// 				{journalData.map((item, index) => (
// 					<MenuItem key={index} value={item.id}>
// 						{item.author}: {item.description.slice(0, 15)}...
// 					</MenuItem>
// 				))}
// 			</Select>
// 		</FormControl>
// 		<Button type="submit" variant="contained" size="large" style={{ marginLeft: 15, marginTop: 5 }}>
// 			Удалить
// 		</Button>
// 	</form>
// </div>
