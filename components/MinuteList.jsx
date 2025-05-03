import Stack from '@mui/material/Stack'

import MinuteListItem from './MinuteListItem'

const MinuteList = ({items}) => {
  return (
    <Stack spacing={2} mt={2}>
        {items.map(item => (
            <MinuteListItem key={item._id} item={item} />
        ))}
    </Stack>
  )
}

export default MinuteList