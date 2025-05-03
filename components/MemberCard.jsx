import CardActionArea from '@mui/material/CardActionArea'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const MemberCard = ({ member }) => {
    return (
        <Card sx={{height: '100%'}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant='h6' component='div'>
                        {`${member.firstName} ${member.lastName.toUpperCase()}`}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Email: {member.email}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default MemberCard