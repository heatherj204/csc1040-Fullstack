import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

export default function StudentList() {

    const [students, setstudent] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/student')
        .then(response => response.json())
        .then(json => {
            setstudent(json); // Convert to array if needed
            console.log(json)
        })
        .catch(error => console.error(error));
    },[]);

    return(
        <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
            <Box>
                <TableContainer component={Paper}>
                <Table sx={{ position: "center",maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Student ID</TableCell>
                        <TableCell align="center">Cohort</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {students.map((student) => (
                        <TableRow
                        key={student.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center">{student.first_name}</TableCell>
                        <TableCell align="center">{student.last_name}</TableCell>
                        <TableCell align="center">{student.student_id}</TableCell>
                        <TableCell align="center">{student.cohort}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}