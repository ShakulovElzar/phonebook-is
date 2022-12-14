import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import {createTheme, styled} from "@mui/system";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import moment from "moment";
import SupportButtons from "../../SupportButtons/SupportButtons";

const MTable = props => {
  const theme = createTheme({
    palette: {
      primary: {
        dark: "#bdbdbd"
      }
    }
  });
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {props.headers.map((el, index) => (
              <StyledTableCell key={index} align="center">
                <strong>{el}</strong>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!props.image
            ? props.bodies.map((el, index) => (
                <TableRow key={index}>
                  {Object.entries(el).map(([key, value]) => (
                    <>
                      {key === "id" || key === "category" || key === "status" ? (
                        <React.Fragment key={key}></React.Fragment>
                      ) : (
                        <TableCell key={index + 1} component="th" scope="row">
                          {key === "date"
                            ? moment(value)
                                .utcOffset(0, false)
                                .format("DD/MM/YYYY")
                            : value
                          }
                        </TableCell>
                      )}
                    </>
                  ))}
                  {(props.showButtons === "MANAGER_IT" || props.isAdmin) && (
                    <TableCell key={index + 1} component="th" scope="row" align='center'>
                      <SupportButtons manager={true} status={el.status} id={el.id} getJournalData={props.getJournalData}/>
                    </TableCell>
                  ) }
                    {props.showButtons === "IT_SPECIALIST" && (
                    <TableCell key={index + 1} component="th" scope="row" align='center'>
                      <SupportButtons  status={el.status} id={el.id} getJournalData={props.getJournalData}/>
                    </TableCell>
                  )}
                </TableRow>
              ))
            : props.bodies.map((el, index) => (
                <TableRow key={index}>
                  {Object.entries(el).map(([key, value]) => (
                    <TableCell key={index + 1}>
                      {index === 0 ? <img alt="" /> : value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MTable;
