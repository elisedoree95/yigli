import Container from '@mui/material/Container';

import Member from '../../models/memberModel'
import Generation from '../../models/generationModel'
import dbConnect from '../../db/connect'
import Meta from '../../layouts/Meta'
import MembersGrid from '../../components/MembersGrid'

const MembersPage = ({ members }) => {
    return (
        <Container>
            <Meta title='Membres' description="Membres de l\'association Yigli Family" />
            <MembersGrid members={members} />
        </Container>
    )
}

export default MembersPage

export const getServerSideProps = async () => {
    await dbConnect()

    const [members] = await Promise.all([
        Member.find().populate('generation', 'index label contributionAmount').lean(),
        Generation.find().lean()
    ])

    return {
        props: { members: JSON.parse(JSON.stringify(members)) }
    }
}