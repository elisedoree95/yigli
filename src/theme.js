import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
            contrastText: '#ffffffff',
        },
        primary_variant: {
            main: '#166519',
            contrastText: '#ffffffff',
        },
        secondary: {
            main: '#19857b',
            contrastText: '#ffffffff',
        },
        secondary_variant: {
            main: '#5a5a15',
            contrastText: '#ffffffff',
        },
        black: {
            main: '#ff000000',
        },
        white: {
            main: '#ffffffff',
        },
        separator: {
            main: '#f4f4f4',
        },
        info: {
            main: '#2196f3'
        },
        error: {
            main: red.A400,
        },
    }
})

export default theme