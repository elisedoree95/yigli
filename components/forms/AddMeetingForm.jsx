import { useEffect, useReducer, useState } from "react"

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { formReducer } from '../../src/reducers/formReducer'
import { ACTIONS } from '../../src/constants/reducerActions'
import submitForm from '../../src/utils/formSubmission'
import { ENDPOINTS } from '../../src/constants/endpoints'
import { MenuProps } from "../../src/constants/menuProps"

const initialState = {
    date: '',
    location: '',
    hosts: []
}

const AddMeetingForm = ({members}) => {
    const [state, dispatch] = useReducer(formReducer, initialState)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        if (success) setSuccessMessage('Réunion enregistrée')
        let delayedAction = setTimeout(() => {
            setSuccessMessage('')
            setSuccess(false)
        }, 2000)
        return () => clearTimeout(delayedAction)
    }, [success])

    const handleInputChange = e => {
        const {name, value} = e.target
        dispatch({type: ACTIONS.CHANGE_INPUT, payload: {name, value}})
    }

    const handleMultiChange = e => {
        const {name, value} = e.target
        const trueValue = typeof value === 'string' ? value.split(',') : value
        dispatch({type: ACTIONS.CHANGE_ARRAY, payload: {name, trueValue}})
    }

    const resetFields = () => {
        dispatch({type: ACTIONS.RESET, payload: initialState})
    }

    const submitIsDisabled = !(state.date && state.location && !!state.hosts.length)

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const result = await submitForm(ENDPOINTS.addMeeting, state)
            if (result.success) {
                setSuccess(true)
                resetFields()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center' mt={3}>
            <Box component='form' onSubmit={handleSubmit} mb={2}>
                <Typography variant='h4' sx={{ textAlign: 'center' }} gutterBottom>
                    Nouvelle Réunion
                </Typography>

                <Stack direction='column' spacing={3}>
                    <TextField
                        type='date'
                        name='date'
                        label='Date'
                        value={state.date}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        size='small'
                        fullWidth
                    />
                    <TextField
                        type='text'
                        name='location'
                        label='Lieu'
                        value={state.location}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
                    <FormControl size='small'>
                        <InputLabel id='hosts-label' >
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

                    <Button
                        variant='contained'
                        type='submit'
                        disabled={submitIsDisabled}
                        fullWidth
                    >
                        Enregistrer Réunion
                    </Button>
                </Stack>
            </Box>
            {success && <Alert severity='success'>{successMessage}</Alert>}
        </Box>
    )
}

export default AddMeetingForm