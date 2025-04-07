import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, Grid} from '@mui/material';
import { Link } from 'react-router';

function GetName(link) {
    const l = link.split('/');
    const name = l[l.length - 2];
    return name;
}

export default function Grades({ id }) {
    const [grades, setGrades] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/grade/?student=' + id)
        .then(response => {
            if (!response.ok) {
                throw Error(`Something went wrong, status: ${response.status}.`)
            }
            return response.json()
        })
        .then((json) => {
            setGrades(json);
            console.log(json);
        })
        .catch(error => {
            setError(error.message);
      });
    }, [id]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, padding: 2 }}>
        { error ? <div>{ error }</div> :
        <Grid container spacing={3} sx={{justifyContent: 'space-evenly'}}>
            {grades.map((details) => {
            const moduleName = GetName(details.module);
            const total = Math.round(details.total_grade);

            return (
                <Card sx={{ boxShadow: 4,  minWidth: 400, minHeight: 275, maxHeight: 276}}>
                    <CardContent>
                    <Typography variant="h6" gutterBottom>
                            <Link to={{ pathname:`/module/${moduleName}`}} style={{ textDecoration: 'none', color: 'purple' }}>
                                {moduleName}
                            </Link>
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" gutterBottom>
                        CA Grade
                        </Typography>
                        <LinearProgress variant="determinate" value={details.ca_mark}
                        sx={{height: 10, borderRadius: 5, backgroundColor: '#e0e0e0'}}
                        />
                        <Typography variant="caption" display="block" textAlign="right" mt={0.5}>
                        {details.ca_mark}%
                        </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        Exam Mark:
                        {details.ca_mark === details.total_grade
                        ?<Box sx={{ mt: 2 }}>
                        <LinearProgress variant="determinate" value={details.exam_mark}
                        sx={{height: 10, borderRadius: 5, backgroundColor: '#e0e0e0'}}
                        />
                        <Typography variant="caption" display="block" textAlign="right" mt={0.5}>
                        N/A
                        </Typography>
                        </Box>
                        :<Box sx={{ mt: 2 }}>
                        <LinearProgress variant="determinate" value={details.exam_mark}
                        sx={{height: 10, borderRadius: 5, backgroundColor: '#e0e0e0'}}
                        />
                        <Typography variant="caption" display="block" textAlign="right" mt={0.5}>
                        {details.exam_mark}%
                        </Typography>
                        </Box>
                        }
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" gutterBottom>
                        Total Grade
                        </Typography>
                        <LinearProgress variant="determinate" value={total}
                        sx={{height: 10, borderRadius: 5, backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                            backgroundColor:
                                total >= 70
                                ? '#4caf50' // green
                                : total >=39
                                ? '#ffb300' // amber
                                : '#f44336' // red
                            }
                        }}
                        />
                        <Typography variant="caption" display="block" textAlign="right" mt={0.5}>
                        {total}%
                        </Typography>
                    </Box>

                    </CardContent>
                </Card>
            );
            })}
        </Grid>}
        </Box>
    );
}
