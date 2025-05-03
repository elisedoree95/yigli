import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

import { extractDate, formatCurrency } from '../src/utils/helpers'
import MinuteList from './MinuteList'
import MinuteItemDialog from './MinuteItemDialog'
import ContributionDialog from './ContributionDialog'

const MeetingDetails = ({ meeting, members, agendaItems, totalContributions }) => {
    const [minutesOpen, setMinutesOpen] = useState(false)
    const [contributionsOpen, setContributionsOpen] = useState(false)

    const handleMinutesOpen = () => setMinutesOpen(true)
    const handleMinutesClose = () => setMinutesOpen(false)

    const handleContributionsOpen = () => setContributionsOpen(true)
    const handleContributionsClose = () => setContributionsOpen(false)

    const total = formatCurrency(totalContributions)

    return (
        <Box p={2} sx={{ width: '100%' }}>
            <Stack>
                <Stack>
                    <Typography variant='h5' textAlign='center'>
                        {extractDate(meeting.date)}
                    </Typography>
                    <Typography variant='h6' textAlign='center'>
                        {meeting.location}
                    </Typography>
                    <Box>{meeting.hosts.length < 2 ? 'Hôte: ' : 'Hôtes: '}
                        {meeting.hosts.map(host => (
                            <Typography key={host._id}>
                                {`${host.firstName} ${host.lastName}`}
                            </Typography>
                        ))}
                    </Box>
                </Stack>

                <Stack py={2} spacing={2}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography>
                            Retards: <span>5</span>
                        </Typography>
                        <Typography>
                            Absences: <span>3</span>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='body2' gutterBottom>
                            Contributions: {total}
                        </Typography>
                        <Button
                            variant='outlined'
                            size='small'
                            onClick={handleContributionsOpen}
                        >
                            Ajouter contribution
                        </Button>
                    </Box>
                    <Box>
                        <Typography variant='h6' textAlign='center'>
                            Procès-verbal
                        </Typography>
                        <Box>
                            <Box display='flex' justifyContent='flex-end'>
                                <Button
                                    variant='outlined'
                                    onClick={handleMinutesOpen}
                                    size='small'
                                    startIcon={<PlaylistAddIcon />}
                                >
                                    Ajouter Objet
                                </Button>

                            </Box>
                            <MinuteList items={agendaItems} />
                        </Box>
                    </Box>
                </Stack>
            </Stack>
            <MinuteItemDialog
                open={minutesOpen}
                handleClose={handleMinutesClose}
                meetingId={meeting._id}
                members={members}
            />
            <ContributionDialog 
                open={contributionsOpen}
                handleClose={handleContributionsClose}
                meetingId={meeting._id}
                date={meeting.date}
                members={members}
            />
        </Box>
    )
}

export default MeetingDetails