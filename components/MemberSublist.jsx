import Link from 'next/link'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'

const MemberSublist = ({ members, title }) => {
    return (
        <Box mb={2} >
            <List dense={true} subheader={title} sx={{ display: {sm: 'block' } }}>
                {members.map(member => (
                    <Link key={member._id} href={`/members/${member._id}`}>
                        <ListItem
                            button={true}
                            sx={{ boxShadow: 1, borderRadius: '8px', marginInline: 'auto', marginBottom: '8px', maxWidth: {xs: '80%', sm: '100%'} }}
                        >
                            <ListItemAvatar >
                                <Avatar alt={member.firstName} src='/img/sample.jpg' />
                            </ListItemAvatar>
                            <ListItemText primary={member.firstName} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    )
}

export default MemberSublist