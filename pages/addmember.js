import Container from '@mui/material/Container'
import AddMemberForm from '../components/forms/AddMemberForm'
import Meta from '../layouts/Meta'

const AddMemberPage = () => {
    const desc = 'Ajouter un membre à l\'effectif'
    return (
        <Container>
            <Meta title='Nouveau membre' description={desc} />
            <AddMemberForm />
        </Container>
    )
}

export default AddMemberPage