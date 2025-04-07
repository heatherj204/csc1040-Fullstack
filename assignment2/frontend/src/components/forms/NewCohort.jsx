import { Card, CardContent, TextField, Typography, Box, CardActions, Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
  
    export default function NewCohort() {
        const navigate = useNavigate();
    
        const [degree, setDegree] = useState([]);
        const [error, setError] = useState(null);
    
        // Form state to capture input values
        const [formData, setFormData] = useState({
        id: "",
        year: "",
        degree: "",
        });
    
        // Handles input field changes
        const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        };
    
        // Handles form submission
        const handleSubmit = (e) => {
        e.preventDefault();
    
        // Modify degree to match API format
        const data = {
            ...formData,
            degree: `http://localhost:8000/api/degree/${formData.degree}/`,
        };
    
        fetch("http://127.0.0.1:8000/api/cohort/", {
            method: "POST",
            headers: {
            "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((resp) => resp.json())
            .then((data) => {
            console.log(data);
            navigate("/cohort"); // Redirect on success
            });
        };
    
        // Fetch degree list on component mount
        useEffect(() => {
        fetch("http://127.0.0.1:8000/api/degree/")
            .then((response) => {
            if (!response.ok) {
                throw Error(`Something went wrong, status: ${response.status}.`);
            }
            return response.json();
            })
            .then((json) => {
            setDegree(json);
            console.log(json);
            })
            .catch((error) => {
            setError(error.message);
            });
        }, []);
    
        return (
        <Card variant="outlined" sx={{ maxWidth: 650, margin: 5 }}>
            <form onSubmit={handleSubmit}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                Create New Cohort
                </Typography>
    
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 300 }}>
                <TextField
                    required
                    slotProps={{htmlInput: {minLength: 1, maxLength: 5}}}
                    name="id"
                    label="Cohort ID"
                    value={formData.id}
                    onChange={handleChange}
                />
    
                <TextField
                    required
                    slotProps={{htmlInput: {min: 1, max: 4}}}
                    name="year"
                    label="Cohort Year"
                    value={formData.year}
                    onChange={handleChange}
                />
    
                <TextField
                    required
                    select
                    name="degree"
                    label="Cohort Degree"
                    value={formData.degree}
                    onChange={handleChange}
                >
                    {degree.map((d) => (
                    <MenuItem key={d.shortcode} value={d.shortcode}>
                        {d.full_name}
                    </MenuItem>
                    ))}
                </TextField>
                </Box>
            </CardContent>
    
            <CardActions>
                <Box>
                <Button color="success" variant="contained" type="submit">
                    Create New Cohort
                </Button>
                </Box>
            </CardActions>
            </form>
        </Card>
        );
    }
  