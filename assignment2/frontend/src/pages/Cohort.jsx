import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TablePagination } from '@mui/material';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import { Link } from 'react-router';

export default function Cohort() {
    const { cohortID } = useParams();
    const [error, setError] = useState(null)
    console.log(cohortID);


    const [cohort, setCohort] = useState([]);
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [studentPage, setStudentPage] = useState(0);
    const [studentRowsPerPage, setStudentRowsPerPage] = useState(5);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/student')
        .then(response => {
            if (!response.ok){
                throw new Error(`Something went wrong, status: ${response.status}.`)
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

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/${cohortID}`)
        .then(response => {
            if (!response.ok) {
                throw Error(`Something went wrong, status: ${response.status}.`)
            }
            return response.json()
        })
            .then(json => {
                setCohort(Array.isArray(json) ? json : [json]);
                console.log(json);
            })
            .catch(error => {
                setError(error.message);
            })
    }, [cohortID]);

    const handleStudentChangePage = (event, newPage) => setStudentPage(newPage);
    const handleStudentChangeRowsPerPage = (event) => {
        setStudentRowsPerPage(parseInt(event.target.value, 10));
        setStudentPage(0);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
            <Box>
                { error ? <div>{ error }</div> :
                <><TableContainer component={Paper}>
                        <Table sx={{ position: "center", minWidth: 750 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ID</TableCell>
                                    <TableCell align="center">Year</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Modules for {cohortID}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cohort.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((details) => (
                                    <TableRow key={details.id}>
                                        <TableCell align="center">{details.id}</TableCell>
                                        <TableCell align="center">{details.year}</TableCell>
                                        <TableCell align="center">{details.name}</TableCell>
                                        <TableCell align="center">
                                            <Link to={{ pathname: `/cohort/module/${details.id}` }} style={{ textDecoration: 'none' }}>
                                                <OpenInNewTwoToneIcon color='secondary' />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                        <Box sx={{ padding: 2 }}>
                            <TableContainer component={Paper}>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={students.filter(student => cohortID === student.cohort.replace(/\/$/, '').split('/').pop()).length}
                                    rowsPerPage={studentRowsPerPage}
                                    page={studentPage}
                                    onPageChange={handleStudentChangePage}
                                    onRowsPerPageChange={handleStudentChangeRowsPerPage} />
                                <Table sx={{ position: "center", minWidth: 750 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">First Name</TableCell>
                                            <TableCell align="center">Last Name</TableCell>
                                            <TableCell align="center">Student ID</TableCell>
                                            <TableCell align="center">View Student</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {students
                                            .filter(student => cohortID === student.cohort.replace(/\/$/, '').split('/').pop())
                                            .slice(studentPage * studentRowsPerPage, studentPage * studentRowsPerPage + studentRowsPerPage)
                                            .map((student) => (
                                                <TableRow key={student.id}>
                                                    <TableCell align="center">{student.first_name}</TableCell>
                                                    <TableCell align="center">{student.last_name}</TableCell>
                                                    <TableCell align="center">{student.student_id}</TableCell>
                                                    <TableCell align="center">
                                                        <Link to={{ pathname: `/student/${student.student_id}` }} style={{ textDecoration: 'none' }}><OpenInNewTwoToneIcon color='secondary' /></Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </>}
            </Box>
        </Box>
    );
}
