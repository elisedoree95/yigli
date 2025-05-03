import Image from 'next/image'
import Box from "@mui/material/Box"

const MemberImage = () => {
    /*
        TO DO:
        1. Extract image url from props
        2. Set Image src to url
        3. While image is being fetched, display blurred placeholder
    */
    return (
        <Box
            sx={{ width: '100%' }}
            flex justifyContent='center'
            alignItems='center'
        >
            <Image
                src='/img/sample.jpg'
                alt='Placeholder pic'
                style={{ display: 'block' }}
                width={200} height={200}
                objectFit='cover'
                layout='responsive'

            />
        </Box>
    )
}

export default MemberImage