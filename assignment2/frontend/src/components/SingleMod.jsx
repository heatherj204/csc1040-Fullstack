import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { Link, useParams } from 'react-router';

export default function SingleMod() {
    const { id } = useParams();
    const [module, setmodule] = useState([]);

    const url = 'http://127.0.0.1:8000/api/module/'+id;

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(json => {
            setmodule([json])
            console.log(json)
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
    console.log(list);
    return (
        list
    )
}
    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 5 }}>
            <Box>
                <TableContainer component={Paper}>
                <Table sx={{ position: "center", minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Code</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Delivered To</TableCell>
                        <TableCell align="center">CA %</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {module?.map((details) => (
                        <TableRow
                        key={details.code}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center">{details.code}</TableCell>
                        <TableCell align="center">{details.full_name}</TableCell>
                        <TableCell align="center">
                            { getname(details.delivered_to).map((n, index) => (
                                <>
                                {index !== 0 ? (" "): null}
                                <Button><Link to={{pathname: `/cohort/${n}`}} style={{textDecoration: 'none'}}>{n}</Link></Button>
                                </>
                            ))}</TableCell>
                        <TableCell align="center">{details.ca_split}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Box>
                        <Button color="secondary" variant='contained' sx={{margin: 2}}><Link to={{pathname: `/module/student/${id}`}} style={{textDecoration: 'none', color: 'white'}}>View students taking {id}</Link></Button>
                        </Box>
                    </Box>
            </Box>
        </Box>
    );
}
