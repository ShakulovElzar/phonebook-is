import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { styled } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/system';

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


    props.bodies.forEach((el) =>
        Object.entries(el).forEach(([key, value]) => {
            if(key === "id" || key === "category"){
                delete el[key]
            }
        })
    );
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650}} stickyHeader aria-label="sticky table">
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
                                        <TableCell key={key}>
                                            {value}
                                        </TableCell>
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