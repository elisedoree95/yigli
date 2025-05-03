import { useEffect, useReducer, useState } from "react"
import { useRouter } from "next/router"

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
import { formReducer } from '../../src/reducers/formReducer'
import { ACTIONS } from '../../src/constants/reducerActions'
import submitForm from '../../src/utils/formSubmission'
import { ENDPOINTS } from '../../src/constants/endpoints'
import { MenuProps } from "../../src/constants/menuProps"

const AddContributionForm = ({ members }) => {
    const router = useRouter()
    const { memberId } = router.query
    const initialState = {
        contributor: memberId ? memberId : '',
        amount: '',
        date: ''
    }
    const emptyState = { contributor: '', amount: '', date: '' }
    const [state, dispatch] = useReducer(formReducer, initialState)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        if (success) setSuccessMessage('Contribution enregistrée.')
        let delayedAction = setTimeout(() => {
            setSuccessMessage('')
            setSuccess(false)
        }, 2000)
        return () => clearTimeout(delayedAction)
    }, [success])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        dispatch({ type: ACTIONS.CHANGE_INPUT, payload: { name, value } })
    }

    const submitIsDisabled = !(
        state.contributor &&
        state.amount &&
        parseInt(state.amount) > 0 &&
        state.date
    )

    const resetFields = () => {
        dispatch({ type: ACTIONS.RESET, payload: emptyState })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const result = await submitForm(ENDPOINTS.addContribution, state)
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
            <Box component='form' onSubmit={handleSubmit} mb={2}>
                <Typography variant='h4' sx={{ textAlign: 'center' }} gutterBottom>
                    Ajouter Contribution
                </Typography>

                <Stack direction='column' spacing={3}>
                    <FormControl size='small'>
                        <InputLabel id='contributor-label'>
                            Contributeur
                        </InputLabel>
                        <Select
                            labelId='contributor-label'
                            id='contributor'
                            label='Contributeur'
                            name='contributor'
                            value={state.contributor || ''}
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
                    <TextField
                        type='number'
                        name='amount'
                        label='Montant'
                        value={state.amount || ''}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
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
                    <Button
                        variant='contained'
                        disabled={submitIsDisabled}
                        type='submit'
                        fullWidth
                    >
                        Enregistrer Contribution
                    </Button>
                </Stack>
            </Box>
            {success && <Alert severity='success'>{successMessage}</Alert>}
        </Box>
    )
}

export default AddContributionForm