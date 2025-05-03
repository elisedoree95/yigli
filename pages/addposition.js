import Container from '@mui/material/Container'
import Meta from '../layouts/Meta'
import AddPositionForm from '../components/forms/AddPositionForm'


const AddPositionPage = () => {
    const desc = 'Ajouter un poste au bureau'
    return (
        <Container>
            <Meta title='Nouveau Poste' description={desc} />
            <AddPositionForm />
        </Container>
    )
}

export default AddPositionPage