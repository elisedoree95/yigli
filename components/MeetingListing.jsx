import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MeetingsTable from './MeetingsTable'

const MeetingListing = ({upcoming, past}) => {
  return (
    <Box>
        <Typography variant='h3' textAlign='center' gutterBottom>
            Réunions
        </Typography>
        <Box mt={2}>
            <Typography variant='h5' gutterBottom>
                Prochaines réunions
            </Typography>
            <MeetingsTable meetings={upcoming} />
        </Box>
        <Box mt={2}>
            <Typography variant='h5' gutterBottom>
                Réunions précédentes
            </Typography>
            <MeetingsTable meetings={past} />
        </Box>
    </Box>
  )
}

export default MeetingListing