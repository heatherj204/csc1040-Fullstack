import { Card, CardContent, TextField, Typography, Box, CardActions, Button, MenuItem } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useNavigate, useLocation } from "react-router";
  
  export default function NewGrades() {
    const location = useLocation();
    const navigate = useNavigate();
  
    const [error, setError] = useState(null);
    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);
    const [cohorts, setCohorts] = useState([]);
    const [isCa, setIsCa] = useState(false); // Controls if exam_mark input should be disabled
  
    const [formData, setFormData] = useState({
      module: "",
      ca_mark: 0,
      exam_mark: 0,
      cohort: "",
      student: "",
    });
  
    // Handles form field changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    // Extracts ID/code from a URL-like string
    const getName = (l) => {
      const list = l.split("/");
      return list[list.length - 2];
    };
  
    // Submits form data to create a new grade
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const data = {
        ...formData,
        cohort: `http://localhost:8000/api/cohort/${formData.cohort}/`,
        module: `http://localhost:8000/api/module/${formData.module}/`,
        student: `http://localhost:8000/api/student/${formData.student}/`,
      };
  
      fetch("http://127.0.0.1:8000/api/grade/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((json) => {
          navigate("/student/" + formData.student);
          console.log(json);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to submit grade.");
        });
    };
  
    // Fetch list of students
    const getStudent = () => {
      fetch("http://localhost:8000/api/student/")
        .then((res) => {
          if (!res.ok) throw new Error(`Status: ${res.status}`);
          return res.json();
        })
        .then(setStudents)
        .catch((err) => setError(err.message));
    };
  
    // Fetch modules for a selected cohort
    const getModules = (cohort) => {
      fetch(`http://localhost:8000/api/module/?delivered_to=${cohort}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Status: ${res.status}`);
          return res.json();
        })
        .then(setModules)
        .catch((err) => setError(err.message));
    };
  
    // Fetch cohorts on mount
    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/cohort/")
        .then((res) => {
          if (!res.ok) throw new Error(`Status: ${res.status}`);
          return res.json();
        })
        .then(setCohorts)
        .catch((err) => setError(err.message));
    }, []);
  
    // Fetch students on mount
    useEffect(() => {
      getStudent();
    }, []);
  
    // If URL has a "sid" param, auto-select that student
    useEffect(() => {
      if (students.length === 0 || formData.student) return;
  
      const params = new URLSearchParams(location.search);
      const idFromUrl = params.get("sid");
  
      if (idFromUrl) {
        setFormData((prev) => ({
          ...prev,
          student: idFromUrl,
        }));
      }
    }, [students]);
  
    // When a student is selected, set the cohort and load modules
    useEffect(() => {
      if (!formData.student) return;
  
      const stu = students.find((s) => s.student_id === formData.student);
      if (!stu) return;
  
      const cohortCode = getName(stu.cohort);
      setFormData((prev) => ({
        ...prev,
        cohort: cohortCode,
      }));
  
      getModules(cohortCode);
    }, [formData.student]);
  
    // If selected module is 100% CA, disable exam input
    useEffect(() => {
      if (!formData.module) return;
  
      const mod = modules.find((m) => m.code === formData.module);
      if (!mod) return;
  
      const isFullCa = mod.ca_split === 100;
      setIsCa(isFullCa);
  
      setFormData((prev) => ({
        ...prev,
        exam_mark: isFullCa ? 0 : prev.exam_mark,
      }));
    }, [formData.module]);
  
    return (
      <Card variant="outlined" sx={{ maxWidth: 650, margin: 5 }}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Add Student Grade
            </Typography>
  
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 300 }}>
              <TextField
                select
                required
                name="student"
                label="Student"
                value={formData.student}
                onChange={handleChange}
              >
                {students.map((s) => (
                  <MenuItem key={s.student_id} value={s.student_id}>
                    {s.first_name} {s.last_name} ({s.student_id})
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                required
                name="cohort"
                label="Cohort"
                value={formData.cohort}
              />
  
              <TextField
                select
                required
                name="module"
                label="Module"
                value={formData.module}
                onChange={handleChange}
              >
                {modules.map((m) => (
                  <MenuItem key={m.code} value={m.code}>
                    {m.full_name} ({m.code})
                  </MenuItem>
                ))}
              </TextField>
  
              <TextField
                required
                type="number"
                name="ca_mark"
                label="CA Mark"
                value={formData.ca_mark}
                onChange={handleChange}
              />
  
              <TextField
                required
                type="number"
                name="exam_mark"
                label="Exam Mark"
                value={formData.exam_mark}
                onChange={handleChange}
                disabled={isCa}
              />
            </Box>
          </CardContent>
  
          <CardActions>
            <Box>
              <Button color="success" type="submit" variant="contained">
                Add Grade
              </Button>
            </Box>
          </CardActions>
        </form>
      </Card>
    );
  }
  