import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Position from '../models/positionModel'
import dbConnect from '../db/connect'
import Meta from '../layouts/Meta'
import { formatAdjunct, formatPosition } from '../src/utils/helpers'

const AboutPage = ({ positions }) => {
    return (
        <Container maxWidth="sm">
            <Meta title='A Propos' description='Héritage de Yigli' />
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Descendance de Jean-Baptiste Medoung, dit Yigli
                </Typography>
                <Box my={2}>
                    <Typography variant='h5' gutterBottom>
                        Exécutif
                        </Typography>
                    <Stack spacing={3}>
                        {positions.map(p => (
                            <Stack key={p._id} direction='row' spacing={2} alignItems='baseline'>
                                <Typography variant='body2' sx={{fontWeight: 'bold'}}>
                                    {`${formatPosition(p.code, p.appointee.sex)} ${p.adjunct ? formatAdjunct(p.appointee.sex) : ''}`}
                                </Typography>
                                <Typography >
                                    {`${p.appointee.firstName} ${p.appointee.lastName}`}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
                <Button variant="contained" href="/">
                    Retour à l&apos;accueil
                </Button>
            </Box>
        </Container>
    )
}

export const getServerSideProps = async () => {
    await dbConnect()

    const positions = await Position.find().populate('appointee', 'firstName lastName sex').lean()

    return {
        props: {
            positions: JSON.parse(JSON.stringify(positions))
        }
    }
}

export default AboutPage