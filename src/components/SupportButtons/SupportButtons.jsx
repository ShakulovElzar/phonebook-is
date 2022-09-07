import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";

const SupportButtons = ({ manager, status, id, getJournalData }) => {
  const makeReportDone = event => {
    event.preventDefault();
    axios.patch(
        `http://10.200.24.103:8089/help/update/${id}/`,
        {
          status: "3"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("atoken")}`
          }
        }
    );
    setTimeout(() => {
      getJournalData();
    }, 500);
  };
  const makeReportInWork = event => {
    event.preventDefault();
    axios.patch(
        `http://10.200.24.103:8089/help/update/${id}/`,
        {
          status: "1"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("atoken")}`
          }
        }
    );
    setTimeout(() => {
      getJournalData();
    }, 500);
  };
  const makeReportWorked = event => {
    event.preventDefault();
    axios.patch(
        `http://10.200.24.103:8089/help/update/${id}/`,
        {
          status: "2"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("atoken")}`
          }
        }
    );
    setTimeout(() => {
      getJournalData();
    }, 500);
  };

  return (
    <React.Fragment>
      {manager ? (
        <React.Fragment>
          {status === "0" && (
            <img
              style={{ width: 30, height: 30 }}
              src="https://cdn-icons-png.flaticon.com/512/2516/2516759.png"
              alt="pending"
            />
          )}

          {status === "1" && (
            <img
              style={{ width: 30, height: 30 }}
              src="https://cdn-icons-png.flaticon.com/512/1716/1716838.png"
              alt="in work"
            />
          )}

          {status === "2" && (
            <Button
              color="success"
              alt="done"
              variant="contained"
              onClick={makeReportDone}
            >
              Подтвердить
            </Button>
          )}
          {status === "3" && (
            <img
              style={{ width: 30, height: 30 }}
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="in work"
            />
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {status === "0" && (
              <Button
                  color="success"
                  alt="done"
                  variant="contained"
                  onClick={makeReportInWork}
              >
                Hа выполнение
              </Button>
          )}

          {status === "1" && (
              <Button
                  color="success"
                  alt="done"
                  variant="contained"
                  onClick={makeReportWorked}
              >
                Выполнено
              </Button>
          )}

          {status === "2" && (
            <h3>В ожидании подтверждения</h3>
          )}
          {status === "3" && (
            <img
              style={{ width: 30, height: 30 }}
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="in work"
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SupportButtons;
