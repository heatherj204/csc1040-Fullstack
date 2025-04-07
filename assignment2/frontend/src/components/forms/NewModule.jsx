import {Card, CardContent, TextField, Typography, Box, CardActions, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MultipleSelectCheckmarks from "../CheckMarkSelect";
    
    export default function NewModule() {
        const navigate = useNavigate();
        const [cohort, setCohort] = useState([]);
        const [error, setError] = useState(null);
        const [deliveredTo, setDeliveredTo] = useState([]);
    
        const [formData, setFormData] = useState({
        code: "",
        full_name: "",
        delivered_to: [],
        ca_split: 0,
        });
    
        // Updates form state when input fields change
        const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        };
    
        // Submit new module to API
        const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/module/", {
            method: "POST",
            headers: {
            "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((resp) => resp.json())
            .then((data) => {
            navigate("/module");
            console.log(data);
            });
        };
    
        // Fetch cohorts for selection dropdown
        useEffect(() => {
        fetch("http://127.0.0.1:8000/api/cohort/")
            .then((response) => {
            if (!response.ok) throw Error(`Status: ${response.status}`);
            return response.json();
            })
            .then(setCohort)
            .catch((err) => setError(err.message));
        }, []);
    
        // Converts cohort objects into an array of cohort IDs
        const convertCohorts = (objs) => objs.map((obj) => obj.id);
    
        // When `deliveredTo` is updated, build proper cohort URLs for API
        useEffect(() => {
        if (!deliveredTo) return;
        const cohortURLs = deliveredTo.map(
            (cohort) => `http://localhost:8000/api/cohort/${cohort}/`
        );
        setFormData((prev) => ({
            ...prev,
            delivered_to: cohortURLs,
        }));
        }, [deliveredTo]);
    
        return (
        <Card variant="outlined" sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
            <form onSubmit={handleSubmit}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                Create New Module
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                    required
                    slotProps={{htmlInput: {minLength: 1, maxLength: 5}}}
                    name="code"
                    label="Module Code"
                    value={formData.code}
                    onChange={handleChange}
                />
                <TextField
                    required
                    name="full_name"
                    label="Module Name"
                    value={formData.full_name}
                    onChange={handleChange}
                />
                {/* Multi-select component for choosing cohorts */}
                <MultipleSelectCheckmarks
                    cohort={convertCohorts(cohort)}
                    selected={deliveredTo}
                    setSelected={setDeliveredTo}
                />
                <TextField
                    required
                    slotProps={{htmlInput: {min: 0, max: 100}}}
                    name="ca_split"
                    label="CA Split (%)"
                    type="number"
                    value={formData.ca_split}
                    onChange={handleChange}
                />
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                <Button color="success" type="submit" variant="contained">
                Create Module
                </Button>
            </CardActions>
            </form>
        </Card>
        );
    }
  