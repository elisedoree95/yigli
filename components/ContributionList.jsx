import Typography from '@mui/material/Typography'
import { extractDate, formatCurrency } from '../src/utils/helpers'

const ContributionList = ({ contributions }) => {
    return (
        <>
            {contributions.map(c => (
                <Typography
                    key={c._id}
                    variant='body2'
                    textAlign={{ xs: 'center', md: 'left' }}
                    gutterBottom
                >
                    {`${extractDate(c.date)}: ${formatCurrency(c.amount)}`}
                </Typography>
            ))}
        </>
    )
}

export default ContributionList