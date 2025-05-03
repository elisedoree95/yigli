import Container from '@mui/material/Container';
import AddGenerationForm from '../components/forms/AddGenerationForm';
import Meta from '../layouts/Meta';

const AddGenerationPage = () => {
    const desc = 'La famille s\'agrandit. Une nouvelle génération arrive.'
    return (
        <Container>
            <Meta title='Nouvelle génération' description={desc} />
            <AddGenerationForm />
        </Container>
    )
}

export default AddGenerationPage