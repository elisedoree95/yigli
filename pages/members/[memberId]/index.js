import Link from 'next/link';

import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import EditIcon from '@mui/icons-material/Edit'

import mongoose from 'mongoose'
import dbConnect from "../../../db/connect"
import Member from '../../../models/memberModel'
import Contribution from '../../../models/contributionModel'
import MemberDetails from '../../../components/MemberDetails'
import Meta from '../../../layouts/Meta';

const MemberDetailsPage = ({ member, contributions }) => {
    const editUrl = `/members/${member._id}/edit`
    return (
        <Container>
            <Meta title='Membres' />
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
            <MemberDetails
                member={member}
                contributions={contributions}
            />
        </Container>
    )
}

export default MemberDetailsPage

export const getServerSideProps = async (context) => {
    const { memberId } = context.params

    await dbConnect()

    const [member, contributions] = await Promise.all([
        Member.findById(memberId)
            .populate('parents', 'firstName lastName')
            .populate('children', 'firstName lastName')
            .lean(),
        Contribution.find({contributor: memberId}).sort('-date').lean(),
    ])
    delete member.password
    
    return {
        props: {
            member: JSON.parse(JSON.stringify(member)),
            contributions: JSON.parse(JSON.stringify(contributions)),
           
        }
    }
}