import Container from '@mui/material/Container'

import Member from '../models/memberModel'
import AddMeetingForm from '../components/forms/AddMeetingForm'
import dbConnect from '../db/connect'
import Meta from '../layouts/Meta'

const AddMeetingPage = ({members}) => {
    const desc = 'Définir la date, le lieu et les hôtes de la prochaine réunion'
    
    return (
        <Container>
            <Meta title='Nouvelle réunion' description={desc} />
            <AddMeetingForm members={members} />
        </Container>
    )
}

export const getServerSideProps = async () => {
    await dbConnect()

    const members = await Member.find().lean()

    return {
        props: {
            members: JSON.parse(JSON.stringify(members)),
        }
    }
}

export default AddMeetingPage