import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const MinuteListItem = ({ item }) => {
    return (
        <Card>
            <CardContent>
                <Stack direction='row' spacing={3}>
                    <Box>
                        <Typography sx={{fontWeight: 'bold'}}>
                            {item.title}
                        </Typography>
                        <Typography variant='caption' color='secondary'>
                            {item.owner.firstName}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>
                            {item.description}
                        </Typography>
                    </Box>
                    {item.resolution && (
                        <Box>
                            <Typography>
                                {item.resolution}
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default MinuteListItem