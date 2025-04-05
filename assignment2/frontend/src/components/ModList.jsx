import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router';

export default function ModList({ code }) {
    console.log(code);
    const [module, setModule] = useState([]);
    const [page, setPage] = useState(0); // Current page index
    const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

    const url = !code ? "http://localhost:8000/api/module/" : `http://127.0.0.1:8000/api/module/?delivered_to=${code}`;

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                setModule(json);
                console.log(json);
            })
            .catch(error => console.error(error));
    }, []);

    function getname(name_link) {
        const list = [];
        if (!name_link) return;

        for (let i = 0; i < name_link.length; i++) {
            const element = name_link[i];

            const l = element.split('/');
            const name = l[l.length - 2]
            list.push(name)
        }
        return (
            list
        )
    }

    // Handle Page Change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle Rows Per Page Change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 5 }}>
            <Box>
                <TableContainer component={Paper}>
                    {/* Pagination Component */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
                        component="div"
                        count={module.length} // Total number of rows
                        rowsPerPage={rowsPerPage} // Rows per page state
                        page={page} // Current page state
                        onPageChange={handleChangePage} // Handle page change
                        onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
                    />
                    <Table sx={{ width: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Code</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Delivered To</TableCell>
                                <TableCell align="center">CA %</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {module
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination logic
                                .map((details) => (
                                    <TableRow key={details.code} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">
                                            <Button>
                                                <Link to={{pathname:`/module/${details.code}`}} style={{ textDecoration: 'none', color: 'purple' }}>
                                                    {details.code}
                                                </Link>
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">{details.full_name}</TableCell>
                                        <TableCell align="center">
                                            {getname(details.delivered_to).map((n, index) => (
                                                <Button key={index}>
                                                    <Link to={{pathname:`/cohort/${n.trim()}`}} style={{ textDecoration: 'none', color: 'purple' }}>
                                                        {n}
                                                    </Link>
                                                </Button>
                                            ))}
                                        </TableCell>
                                        <TableCell align="center">{details.ca_split}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Box>
    );
}
