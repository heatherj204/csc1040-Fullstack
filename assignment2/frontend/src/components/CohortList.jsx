import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { Link } from 'react-router';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';

export default function CohortList({degreeID}) {
    const [cohort, setcohort] = useState([]);

    const url = !degreeID ? "http://localhost:8000/api/cohort/" : "http://localhost:8000/api/cohort/?degree="+degreeID;

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(json => {
            setcohort(json)
            console.log(json)
        })
        .catch(error => console.error(error));
    }, []);
    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 5 }}>
            <Box>
                <TableContainer component={Paper}>
                <Table sx={{ position: "center",maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Year</TableCell>
                        <TableCell align="center">View Cohort</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {cohort.map((details) => (
                        <TableRow
                        key={details.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center">{details.id}</TableCell>
                        <TableCell align="center">{details.year}</TableCell>
                        <TableCell align="center"><Link to={{pathname: `/cohort/${details.id}`}} style={{textDecoration: 'none'}}><OpenInNewTwoToneIcon/></Link></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
