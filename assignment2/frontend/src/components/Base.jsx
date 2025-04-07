import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
const pages = [
    { name: 'Home', path: '/' },
    { name: 'Degree', path: '/degree' },
    { name: 'Cohort', path: '/cohort' },
    { name: 'Module', path: '/module' }
];

function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (location.state?.error) {
            setErrorMessage(location.state.error);
        }
    }, [location]);



    return (
        <AppBar position="static" color='secondary'>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <SchoolTwoToneIcon sx={{ mr: 2, fontSize: 'large'}} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                UNI API
            </Typography>

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                {pages.map((page) => (
                <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{ my: 2, color: 'white' }}
                >
                    {page.name}
                </Button>
                ))}
            </Box>
            </Toolbar>
        </Container>
            <div>
                {errorMessage && (
                    <div style={{ backgroundColor: '#ffe0e0', padding: '1em', margin: '1em 0', borderRadius: '5px', color: '#b00020' }}>
                        {errorMessage}
                    </div>
                )}
                {/* Your usual home content */}

            </div>
        </AppBar>
    );
}

export default Nav;
