import { Box } from '@mui/material';
import ModList from '../components/ModList';
import { useParams } from 'react-router';
import Heading from '../components/Heading';

export default function Module() {
    const {code} = useParams()
    return(
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{textAlignLast: 'center'}}>
            <Heading primary={'Modules for:'} secondary={code}/>
            <ModList code={code}/>
            </Box>
        </Box>
    )
}