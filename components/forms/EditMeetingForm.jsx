import { useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { formReducer } from '../../src/reducers/formReducer'
import { ACTIONS } from '../../src/constants/reducerActions'
import { submitPutForm } from '../../src/utils/formSubmission'
import { ENDPOINTS } from '../../src/constants/endpoints'
import { prefillDate } from '../../src/utils/helpers'
import { MenuProps } from '../../src/constants/menuProps'

/*
    TO DO:
    1. Import member list prop
    2. Handle display of member list
    3. Test functionality
    4. Handle form submission
*/

const EditMeetingForm = ({ meeting, members }) => {
    const [state, dispatch] = useReducer(formReducer, meeting)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [complete, setComplete] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (success) setSuccessMessage('Réunion modifiée. Redirection en cours...')
        let delayedAction = setTimeout(() => {
            setSuccessMessage('')
            setSuccess(false)
        }, 2000)
        return () => clearTimeout(delayedAction)
    }, [success])

    useEffect(() => {
        let delayedRedirection = setTimeout(() => {
            if (complete) router.push(`/meetings/${meeting._id}`)
        }, 2100)
        return () => clearTimeout(delayedRedirection)
    }, [complete, router, meeting._id])

    const handleInputChange = e => {
        const { name } = e.target
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        dispatch({ type: ACTIONS.CHANGE_INPUT, payload: { name, value } })
    }

    const handleMultiChange = e => {
        const { name, value } = e.target
        const trueValue = typeof value === 'string' ? value.split(',') : value
        dispatch({ type: ACTIONS.CHANGE_ARRAY, payload: { name, trueValue } })
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const result = await submitPutForm(ENDPOINTS.editMeeting(meeting._id), state)
            if (result.success) {
                setSuccess(true)
                setComplete(true)
            }
        } catch (error) {
            console.log(error.message)
        }

    }
    return (
        <Box display='flex' flexDirection='column' alignItems='center' mt={3}>
            <Box component='form' onSubmit={handleSubmit} mb={2}>
                <Typography variant='h4' textAlign='center' gutterBottom>
                    Modifier Réunion
                </Typography>

                <Stack direction='column' spacing={3}>
                    <TextField
                        type='date'
                        name='date'
                        label='Date'
                        value={prefillDate(state.date) || ''}
                        onChange={handleInputChange}
                        size='small'
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                    <TextField
                        type='text'
                        name='location'
                        label='Lieu'
                        value={state.location}
                        onChange={handleInputChange}
                        size='small'
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                    <FormControl size='small'>
                        <InputLabel id='hosts-label'>
                            Hôtes
                        </InputLabel>
                        <Select
                            labelId='hosts-label'
                            id='hosts'
                            label='Hôtes'
                            name='hosts'
                            multiple
                            value={state.hosts || ''}
                            onChange={handleMultiChange}
                            input={<OutlinedInput label='Hôtes' />}
                            MenuProps={MenuProps}
                        >
                            {members.map(m => (
                                <MenuItem key={m._id} value={m._id}>
                                {`${m.firstName} ${m.lastName}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name='upcoming'
                                    // value={state.upcoming || false}
                                    checked={state.upcoming}
                                    onChange={handleInputChange}
                                />
                            }
                            label='A venir'
                        />
                    </FormControl>
                </Stack>

                <Box maxWidth={400} mx='auto' mt={{ xs: 2, md: 8 }}>
                    <Button variant='contained' type='submit' fullwidth='true'>
                        Enregistrer Changements
                    </Button>
                </Box>
            </Box>
            {success && <Alert severity='success'>{successMessage}</Alert>}
        </Box>
    )
}

export default EditMeetingForm