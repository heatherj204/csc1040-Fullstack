import React, { useState, useEffect } from 'react';
import { Link } from 'react-router'; // Fixed import
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Added Grid
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function DegreeList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(response => response.json())
      .then(json => {
        setCourses(json);
        console.log(json);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {courses.map((course, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={course.shortcode}
            sx={{
              display: 'flex',
              justifyContent: courses.length % 3 !== 0 && index >= courses.length - (courses.length % 3) ? 'center' : 'flex-start'
            }}
          >
            <Card variant="outlined" sx={{ minWidth: 275, minHeight: 150, padding: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {course.full_name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                  {course.shortcode}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  <Link to={`/degree/${course.shortcode}`} style={{ textDecoration: 'none' }}>
                    View Degree
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
