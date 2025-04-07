import { Link, useParams } from 'react-router';
import StudentList from '../components/StudentList';
import Heading from '../components/Heading';
import Grades from '../components/Grade';
import { Box, Button } from '@mui/material';

export default function StudentInfo(){
    const { id } = useParams()

    return (
        <>
        <Heading primary={'Information about student'} secondary={id}/>
        <Box variant sx={{ display: 'flex', justifyContent: 'center', margin: 4 }}>
            <Button><Link to={`/student/newstudent`} style={{ textDecoration: 'none', color: 'purple' }}>Create New Student</Link></Button>
        </Box>
        <Box variant sx={{ display: 'flex', justifyContent: 'center', margin: 4 }}>
            <Button><Link to={`/student/newgrade`} style={{ textDecoration: 'none', color: 'purple' }}>Add grades</Link></Button>
        </Box>
        <StudentList  sid={id}/>
        <Heading secondary={'Grades for modules taken'}/>
        <Grades id={id}/>
        </>
    )
}