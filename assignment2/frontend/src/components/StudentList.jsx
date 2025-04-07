import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TablePagination } from '@mui/material';

export default function StudentList({ filteredStudents, cohortID, sid }) {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [error, setError] = useState(null)

    useEffect(() => {
        if (filteredStudents) {
            setStudents(filteredStudents);
        }
    }, [filteredStudents]);

    const url = !sid ? 'http://127.0.0.1:8000/api/student/'+cohortID : 'http://127.0.0.1:8000/api/student/'+sid;
    useEffect(() => {
        if (filteredStudents) return;
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(`Something went wrong, status: ${response.status}.`)
            }
            return response.json()
        })
        .then(json => {
            setStudents(json);
            console.log(json);
        })
        .catch(error => {
            setError(error.message);
        });
    }, []);

    function getStudent(cohort_link) {
        if (!cohort_link) return null;
        const name = cohort_link.split('/');
        return name[name.length - 2];
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
            <Box>
            { error ? <div>{ error }</div> :
                <TableContainer component={Paper}>
                    {!sid ?
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={students.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />: null}
                    <Table sx={{ position: "center", minWidth: 700 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Student ID</TableCell>
                                <TableCell align="center">Cohort</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* If there is only one student (the SID is given) then there is no need for pagination */}
                            {!sid ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell align="center">{student.first_name}</TableCell>
                                    <TableCell align="center">{student.last_name}</TableCell>
                                    <TableCell align="center">{student.email}</TableCell>
                                    <TableCell align="center">{student.student_id}</TableCell>
                                    <TableCell align="center">{getStudent(student.cohort)}</TableCell>
                                </TableRow>
                            )) :
                                <TableRow key={students.id}>
                                    <TableCell align="center">{students.first_name}</TableCell>
                                    <TableCell align="center">{students.last_name}</TableCell>
                                    <TableCell align="center">{students.email}</TableCell>
                                    <TableCell align="center">{students.student_id}</TableCell>
                                    <TableCell align="center">{getStudent(students.cohort)}</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>}
            </Box>
        </Box>
    );
}
