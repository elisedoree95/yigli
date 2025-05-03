import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { formatCurrency } from '../src/utils/helpers'

const MemberContributionCell = ({contribution}) => {
    const total = contribution ? formatCurrency(contribution) : 0

    return (
        <Stack
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
            sx={{ width: '100%' }}
        >
            <Typography textAlign={{ xs: 'center', md: 'left' }} >
                Total contribué: {total}
            </Typography>
        </Stack>
    )
}

export default MemberContributionCell