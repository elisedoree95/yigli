import Link from 'next/link'

import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import EditIcon from '@mui/icons-material/Edit'

import mongoose from 'mongoose'
import dbConnect from '../../../db/connect'
import Meeting from '../../../models/meetingModel'
import Member from '../../../models/memberModel'
import AgendaItem from '../../../models/agendaItemModel'
import Contribution from '../../../models/contributionModel'
import MeetingDetails from '../../../components/MeetingDetails'
import Meta from '../../../layouts/Meta'

const MeetingDetailsPage = ({ meeting, members, agendaItems, totalContributions }) => {
    const editUrl = `/meetings/${meeting._id}/edit`

    return (
        <Container>
            <Meta title='Réunions' />
            <Box px={4} mt={2} display='flex' justifyContent='flex-end'>
                <Link href={editUrl} passHref>
                    <Button
                        variant='outlined'
                        size='small'
                        startIcon={<EditIcon />}
                    >
                        Modifier
                    </Button>
                </Link>
            </Box>
            <MeetingDetails
                meeting={meeting}
                members={members}
                agendaItems={agendaItems}
                totalContributions={totalContributions}
            />
        </Container>
    )
}

export default MeetingDetailsPage

export const getServerSideProps = async (context) => {
    const { meetingId } = context.params

    await dbConnect()
    const [meeting, members, agendaItems, totalContributions] = await Promise.all([
        Meeting.findById(meetingId).populate('hosts').lean(),
        Member.find().select({ password: 0 }).lean(),
        AgendaItem.find({ meeting: meetingId }).populate('owner', 'firstName lastName').lean(),
        Contribution.aggregate([
            { $match: { meeting: new mongoose.Types.ObjectId(meetingId) } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ])
    ])

    return {
        props: {
            meeting: JSON.parse(JSON.stringify(meeting)),
            members: JSON.parse(JSON.stringify(members)),
            agendaItems: JSON.parse(JSON.stringify(agendaItems)),
            totalContributions: !!totalContributions.length 
            ? totalContributions[0].totalAmount
            : 0
        }
    }
}