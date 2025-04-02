import { Box } from '@mui/material';
import ModList from './ModList';
import { useParams } from 'react-router';

export default function Module() {
    const {code} = useParams()
    return(
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{textAlignLast: 'center'}}>
            <h1>Modules for {code}</h1>
            <ModList code={code}/>
            </Box>
        </Box>
    )
}