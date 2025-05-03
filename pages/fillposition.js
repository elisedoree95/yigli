import Container from '@mui/material/Container'

import FillPositionForm from '../components/forms/FillPositionForm'
import Position from '../models/positionModel'
import Member from '../models/memberModel'
import dbConnect from '../db/connect'
import Meta from '../layouts/Meta'


const FillPositionPage = ({ positions, members }) => {

    return (
        <Container>
            <Meta title='Affectation' />
            <FillPositionForm
                positions={positions}
                members={members}
            />
        </Container>
    )
}

export const getServerSideProps = async () => {
    await dbConnect()

    const [positions, members] = await Promise.all([
        Position.find().lean(),
        Member.find().lean()
    ])

    return {
        props: {
            positions: JSON.parse(JSON.stringify(positions)),
            members: JSON.parse(JSON.stringify(members))
        }
    }
}

export default FillPositionPage
