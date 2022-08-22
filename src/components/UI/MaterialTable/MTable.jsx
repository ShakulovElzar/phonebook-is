import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import {createTheme, styled} from '@mui/system';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

const MTable = (props) => {
    const theme = createTheme({
        palette: {
          primary: {
            dark: '#bdbdbd',
          }
        },
      });
    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.dark,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
    return (
        <TableContainer component={Paper} >
            <Table stickyHeader sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        {props.headers.map((el, index) => <StyledTableCell key={index} align="center"><strong>{el}</strong></StyledTableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>

                    {
                        !props.image
                            ?
                            props.bodies.map((el, index) =>
                                <TableRow key={index}>
                                    {Object.entries(el).map(([key, value]) =>
                                        <>
                                        {
                                            (key === "id" || key === "category")
                                            ?
                                                <></>
                                            :
                                                <TableCell key={key} component="th" scope="row">
                                                    {value}
                                                </TableCell>
                                        }
                                        </>
                                    )}
                                </TableRow>
                            )
                            :
                            props.bodies.map((el, index) =>
                                <TableRow key={index}>
                                    {Object.entries(el).map(([key, value]) => <TableCell key={key}>
                                            {
                                                index === 0
                                                    ?
                                                    <img alt="" />
                                                    :
                                                    value
                                            }
                                        </TableCell>
                                    )}
                                </TableRow>
                        )
                    }
                   
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MTable;