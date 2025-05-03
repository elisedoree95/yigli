import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const MemberNameCell = ({ memberName, memberAddress }) => {
    return (
        <Stack
            sx={{ width: '100%' }}
            spacing={2}
            justifyContent={{ sm: 'flex-start', md: 'space-between' }}
            alignItems={{ sm: 'flex-start', sm: 'center', md: 'center' }}
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
        >
            <Typography

                sx={{
                    typography: { xs: 'h4', sm: 'h3', md: 'h2' },
                    fontSize: { xs: '2.125rem', sm: '2.75rem', md: '3rem' }
                }}
                textAlign={{ xs: 'center', md: 'left' }}
                
            >
                {memberName}
            </Typography>
            <Stack
                color='text.secondary'
                direction='row'
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
                alignItems='center'
            >
                <Typography sx={{fontSize: {xs: '.8rem', md: '.9rem'}}}>
                    <LocationOnIcon mr={1} />
                </Typography>
                <Typography noWrap sx={{fontSize: {xs: '.8rem', md: '.9rem'}}}>
                    {memberAddress}
                </Typography>

            </Stack>
        </Stack>
    )
}

export default MemberNameCell