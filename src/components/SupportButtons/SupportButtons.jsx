import React, {useContext} from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import {AdminContext} from "../../context";

const SupportButtons = ({ manager, status, id, getJournalData }) => {
    const {isAdmin} = useContext(AdminContext);
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
      {(manager || isAdmin) ? (
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
              ??????????????????????
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
                H?? ????????????????????
              </Button>
          )}

          {status === "1" && (
              <Button
                  color="success"
                  alt="done"
                  variant="contained"
                  onClick={makeReportWorked}
              >
                ??????????????????
              </Button>
          )}

          {status === "2" && (
            <h3>?? ???????????????? ??????????????????????????</h3>
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
