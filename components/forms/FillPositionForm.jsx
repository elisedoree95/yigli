import { useEffect, useReducer, useState } from "react"

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { MenuProps } from "../../src/constants/menuProps"
import { formReducer } from "../../src/reducers/formReducer"
import { ACTIONS } from "../../src/constants/reducerActions"
import { submitPutForm } from "../../src/utils/formSubmission"
import { ENDPOINTS } from "../../src/constants/endpoints"

const initialState = {
    positionId: '',
    appointee: ''
}

const FillPositionForm = ({ positions, members }) => {
    const [state, dispatch] = useReducer(formReducer, initialState)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        if (success) setSuccessMessage('Membre affecté.')
        let delayedAction = setTimeout(() => {
            setSuccessMessage('')
            setSuccess(false)
        }, 2000)
        return () => clearTimeout(delayedAction)
    }, [success])

    const handleInputChange = e => {
        const { name, value } = e.target
        dispatch({ type: ACTIONS.CHANGE_INPUT, payload: { name, value } })
    }

    const resetFields = () => dispatch({ type: ACTIONS.RESET, payload: initialState })

    const submitIsDisabled = !(state.positionId && state.appointee)

    const handleSubmit = async e => {
        e.preventDefault()
        const { positionId, appointee } = state
        try {
            const result = await submitPutForm(ENDPOINTS.editPosition(positionId), { appointee })
            if (result.success) {
                setSuccess(true)
                resetFields()
            }
        } catch (error) {
            console.log(error.message)
        }

    }
    return (
        <Box display='flex' flexDirection='column' alignItems='center' mt={3}>
            <Box component='form' width={300} onSubmit={handleSubmit} mb={2}>
                <Typography variant='h4' sx={{ textAlign: 'center' }} gutterBottom>
                    Affectations
                </Typography>
                <Stack direction='column' spacing={3}>
                    <FormControl size='small'>
                        <InputLabel id='position-label'>
                            Poste
                        </InputLabel>
                        <Select
                            labelId='position-label'
                            id='position'
                            label='Poste'
                            name='positionId'
                            value={state.positionId || ''}
                            onChange={handleInputChange}
                            MenuProps={MenuProps}
                        >
                            {positions.map(p => (
                                <MenuItem key={p._id} value={p._id}>
                                    {`${p.label} ${p.adjunct ? '- adjoint' : ''}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size='small'>
                        <InputLabel id='member-label'>
                            Affecté
                        </InputLabel>
                        <Select
                            labelId='member-label'
                            id='member'
                            label='Affecté'
                            name='appointee'
                            value={state.appointee || ''}
                            onChange={handleInputChange}
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
                        Affecter
                    </Button>
                </Stack>
            </Box>
            {success && <Alert severity='success'>{successMessage}</Alert>}
        </Box>
    )
}

export default FillPositionForm