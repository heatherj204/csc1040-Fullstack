// import React, { useState, useEffect, Link } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Box } from '@mui/material';
import { useParams } from 'react-router';
import StudentList from '../components/StudentList';
import Heading from '../components/Heading';
import Grades from '../components/Grade';

export default function StudentInfo(){
    const { id } = useParams()

    return (
        <>
        <Heading primary={'Information about student'} secondary={id}/>
        <StudentList  sid={id}/>
        <Heading secondary={'Grades for modules taken'}/>
        <Grades id={id}/>
        </>
    )
}