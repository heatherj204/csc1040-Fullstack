import { Card, CardContent, TextField, Typography, Box, CardActions, Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function NewStudent() {

    const navigate = useNavigate()
    const [degree, setDegree]= useState([])
    const [error, setError] = useState(null)
    const [cohorts, setCohorts] = useState([])
    const [formData, setFormData] = useState({
        'student_id':'',
        'first_name':'',
        'last_name':'',
        'cohort':''
    });

  const handleChange = (e) =>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}

const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(e);
    console.log(formData);

    let data = formData
    data.cohort = `http://localhost:8000/api/cohort/${formData.cohort}/`

    fetch('http://127.0.0.1:8000/api/student/', {
        method:'POST',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    .then(resp=>resp.json())
    .then(data=>{
        navigate("/student/"+formData.student_id)
        console.log(data)
    })
}

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/')
    .then(response => {
      if (!response.ok) {
          throw Error(`Something went wrong, status: ${response.status}.`)
        }
        return response.json()
        })
      .then(json => {
        setCohorts(json);
        console.log(json);
      })
      .catch(error => {
        setError(error.message);
      });

  }, []);

  return (
    <Card variant="outlined" sx={{ maxWidth: 650, margin: 5 }}>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Create New Student
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 300 }}>
            
            <TextField
              required
              slotProps={{htmlInput: {minLength: 1, maxLength: 8}}}
              name="student_id"
              label="Student ID"
              value={formData.student_id}
              onChange={handleChange}
            />
  
            <TextField
              required
              name="first_name"
              label="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
  
            <TextField
              required
              name="last_name"
              label="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />
  
            <TextField
              required
              select
              name="cohort"
              label="Cohort"
              value={formData.cohort}
              onChange={handleChange}
            >
              {cohorts.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </TextField>
  
          </Box>
        </CardContent>
        <CardActions>
          <Box>
            <Button color="success" type="submit" variant="contained">
              Create Student
            </Button>
          </Box>
        </CardActions>
      </form>
    </Card>
  );
  
}
