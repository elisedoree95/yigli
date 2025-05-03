import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import MemberCard from './MemberCard'

const MemberSubgrid = ({ members, heading }) => {
    return (
        <>
            <Typography variant='h5' color='primary'>{heading}</Typography>
            <Grid
                container
                py={2}
                mb={4}
                spacing={{ xs: 2, md: 3 }}
            >
                {members.map(member => (
                    <Grid
                        item
                        key={member._id}
                        xs={12} sm={6} md={4}
                    >
                        <Link href={`/members/${member._id}`} passHref>
                            <a style={{ textDecoration: 'none' }}>
                                <MemberCard member={member} />
                            </a>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default MemberSubgrid