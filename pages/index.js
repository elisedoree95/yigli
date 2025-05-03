import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Meta from '../layouts/Meta'
import styles from '../styles/Home.module.css'
import dbConnect from '../db/connect'
import Meeting from '../models/meetingModel'
import Contribution from '../models/contributionModel'
import {formatCurrency } from '../src/utils/helpers'
import MeetingsTable from '../components/MeetingsTable'

export default function Home({ meetings, totalContributions}) {
    const futureMeetings = meetings.filter(meeting => meeting.upcoming)
    const pastMeetings = meetings.filter(meeting => !meeting.upcoming)

    return (
        <Container>
            <Meta description='Descendance de Jean-Baptiste Medoung' />

            <Box maxWidth={'80%'} sx={{marginInline: 'auto'}}>
                <Box>
                    <h4>Prochaines réunions</h4>
                    <MeetingsTable meetings={futureMeetings} />
                </Box>
                
                <Box>
                    <h4>Réunions récentes</h4>
                    <MeetingsTable meetings={pastMeetings} />
                </Box>
            </Box>
        </Container>
    )
}

export const getServerSideProps = async () => {
    await dbConnect()

    const meetings = await Meeting.find().sort('-date').lean()
    const totalContributions = await Contribution.aggregate([
        { $match: { amount: { $gte: 0 } } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ])

    return {
        props: {
            meetings: JSON.parse(JSON.stringify(meetings)),
            totalContributions: totalContributions[0].totalAmount
        }
    }
}
