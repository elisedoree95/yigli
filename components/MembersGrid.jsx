import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from 'next/link'
import MemberSubgrid from './MemberSubgrid';

const addMemberUrl = '/addmember'

const MembersGrid = ({ members }) => {
    const matriarch = members.filter(m => m.generation?.index === 0)
    const gen1 = members.filter(m => m.generation?.index === 1)
    const gen2 = members.filter(m => m.generation?.index === 2)
    const gen3 = members.filter(m => m.generation?.index === 3)
    const unranked = members.filter(m => Object.keys(m.generation).length === 0)

    return (
        <>
            <Typography variant='h2' mt={2} component='div' textAlign='center'>
                Membres
            </Typography>
            <Typography variant='caption' textAlign='center' component='div' color='text.secondary'>
                Effectif: {members.length}
            </Typography>
            <Box mt={2} display='flex' justifyContent='flex-end'>
                <Link href={addMemberUrl} passHref>
                    <Button
                        variant='outlined'
                        size='small'
                        startIcon={<PersonAddIcon />}
                    >
                        Ajouter
                    </Button>
                </Link>
            </Box>
            {!!matriarch.length && <MemberSubgrid members={matriarch} heading='Matriarche' />}
            {!!gen1.length && <MemberSubgrid members={gen1} heading='Enfants' />}
            {!!gen2.length && <MemberSubgrid members={gen2} heading='Petits-enfants' />}
            {!!gen3.length && <MemberSubgrid members={gen3} heading='Arrière-petits-enfants' />}
            {!!unranked.length && <MemberSubgrid members={unranked} heading='Non classés' />}
        </>
    )
}

export default MembersGrid