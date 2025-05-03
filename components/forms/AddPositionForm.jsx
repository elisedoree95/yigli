import { useEffect, useReducer, useState } from 'react'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { formReducer } from '../../src/reducers/formReducer'
import { ACTIONS } from '../../src/constants/reducerActions'
import submitForm from '../../src/utils/formSubmission'
import { ENDPOINTS } from '../../src/constants/endpoints'

const initialState = {
    label: '',
    adjunct: false
}

const AddPositionForm = () => {
    const [state, dispatch] = useReducer(formReducer, initialState)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        if (success) setSuccessMessage('Poste enregistré')
        let delayedAction = setTimeout(() => {
            setSuccessMessage('')
            setSuccess(false)
        }, 2000)
        return () => clearTimeout(delayedAction)
    }, [success])

    const handleInputChange = e => {
        const { name } = e.target
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        dispatch({ type: ACTIONS.CHANGE_INPUT, payload: { name, value } })
    }

    const resetFields = () => {
        dispatch({ type: ACTIONS.RESET, payload: initialState })
    }

    const submitIsDisabled = !(state.label)

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const result = await submitForm(ENDPOINTS.addPosition, state)
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
                    Nouveau Poste
                </Typography>

                <Stack direction='column' spacing={3}>
                    <TextField
                        type='text'
                        name='label'
                        label='Libellé'
                        value={state.label || ''}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name='adjunct'
                                    checked={state.adjunct}
                                    onChange={handleInputChange}
                                />
                            }
                            label='Adjoint'
                        />
                    </FormControl>

                    <Button
                        variant='contained'
                        type='submit'
                        disabled={submitIsDisabled}
                        fullWidth
                    >
                        Enregistrer Poste
                    </Button>
                </Stack>
            </Box>
            {success && <Alert severity='success'>{successMessage}</Alert>}
        </Box>
    )
}

export default AddPositionForm