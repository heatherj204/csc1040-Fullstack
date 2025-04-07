import {
    Card,
    CardContent,
    TextField,
    Typography,
    Box,
    CardActions,
    Button,
  } from "@mui/material";
  import { useState } from "react";
  import { useNavigate } from "react-router";
  
  export default function NewDegree() {
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      full_name: "",
      shortcode: "",
    });
  
    // Handles updates to form fields
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    // Sends new degree to API
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://127.0.0.1:8000/api/degree/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((resp) => resp.json())
        .then((data) => {
          navigate("/degree");
          console.log(data);
        });
    };
  
    return (
      <Card variant="outlined" sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Create New Degree
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                required
                slotProps={{htmlInput: {minLength: 1, maxLength: 5}}}
                name="shortcode"
                label="Short Code"
                value={formData.shortcode}
                onChange={handleChange}
              />
              <TextField
                required
                name="full_name"
                label="Full Name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
            <Button color="success" type="submit" variant="contained">
              Create
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
  