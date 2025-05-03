import Link from 'next/link'

import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import InfoIcon from '@mui/icons-material/Info'
import { extractDate } from '../src/utils/helpers'

const MeetingsTable = ({ meetings }) => {

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Lieu</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {meetings.map(meeting => (
                        <TableRow key={meeting._id}>
                            <TableCell>{extractDate(meeting.date)}</TableCell>
                            <TableCell>{meeting.location}</TableCell>
                            <TableCell>
                                <Link href={`/meetings/${meeting._id}`} passHref>
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        startIcon={<InfoIcon />}
                                    >
                                        Détails
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MeetingsTable