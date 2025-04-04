import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import { Link } from 'react-router';
// import StudentList from './StudentList';
import StudentList from '../components/StudentList';

export default function Cohort() {
    const { cohortID } = useParams();
    console.log(cohortID);

    const [cohort, setcohort] = useState([]);
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

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cohort/'+cohortID)
        .then(response => response.json())
        .then(json => {
            setcohort(Array.isArray(json) ? json : [json]); // Convert to array if needed
            console.log(json)
        })
        .catch(error => console.error(error));
    }, [cohortID]);

    return(
        <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
            <Box>
                <TableContainer component={Paper}>
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
                    {cohort.map((details) => (
                        <TableRow
                        key={details.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center">{details.id}</TableCell>
                        <TableCell align="center">{details.year}</TableCell>
                        <TableCell align="center">{details.name}</TableCell>
                        <TableCell align='center'><Link to={{pathname: `/cohort/module/${details.id}`}} style={{textDecoration: 'none'}}><OpenInNewTwoToneIcon/></Link></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <>
                <StudentList cohortID={cohortID}/>
                </>
            </Box>
        </Box>
    );
}