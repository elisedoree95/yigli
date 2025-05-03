import { useEffect, useReducer, useState } from 'react'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { ENDPOINTS } from '../../src/constants/endpoints'
import { genFormReducer } from '../../src/reducers/genFormReducer'
import submitForm from '../../src/utils/formSubmission'

const initialState = {
    index: '',
    label: '',
    contributionAmount: '',
    dependent: false
}

const AddGenerationForm = () => {
    const [state, dispatch] = useReducer(genFormReducer, initialState)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        if (success) setSuccessMessage('Génération ajoutée.')
        let delayedAction = setTimeout(() => {
            setSuccessMessage('')
            setSuccess(false)
        }, 2000)
        return () => clearTimeout(delayedAction)
    }, [success])

    const handleInputChange = e => {
        const name = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        dispatch({ type: 'CHANGE_INPUT', payload: { name, value } })
    }

    const resetFields = () => {
        dispatch({ type: 'RESET', payload: initialState })
    }

    const submitIsDisabled = !(state.index && state.label && state.contributionAmount)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formValues = {
            ...state,
            index: parseInt(state.index),
            contributionAmount: parseInt(state.contributionAmount)
        }
        try {
            const result = await submitForm(ENDPOINTS.addGeneration, formValues)
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
            <Box component='form' width={300} onSubmit={handleSubmit} mb={2}>
                <Typography variant='h4' sx={{ textAlign: 'center' }} gutterBottom>
                    Nouvelle Génération
                </Typography>
                <Stack direction='column' spacing={3}>
                    <TextField
                        type='number'
                        name='index'
                        label='Index'
                        value={state.index}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
                    <TextField
                        type='text'
                        name='label'
                        label='Label'
                        value={state.label}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
                    <TextField
                        type='number'
                        name='contributionAmount'
                        label='Montant'
                        value={state.contributionAmount}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name='dependent'
                                value={state.dependent}
                                onChange={handleInputChange}
                            />
                        }
                        label="A charge"
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        disabled={submitIsDisabled}
                        fullWidth
                    >
                        Enregistrer
                    </Button>

                </Stack>

            </Box>
            {success && <Alert severity='success'>{successMessage}</Alert>}
        </Box>
    )
}

export default AddGenerationForm