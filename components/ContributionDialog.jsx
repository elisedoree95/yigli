import { useReducer } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { MenuProps } from '../src/constants/menuProps'
import { formReducer } from '../src/reducers/formReducer'
import submitForm from '../src/utils/formSubmission'
import { ENDPOINTS } from '../src/constants/endpoints'
import { ACTIONS } from '../src/constants/reducerActions'

const initialState = {
    meeting: '',
    contributor: '',
    amount: '',
    date: ''
}

const ContributionDialog = ({ open, handleClose, meetingId, date, members }) => {
    const [state, dispatch] = useReducer(formReducer, initialState)

    const addStateField = (fieldName, fieldValue) => {
        const name = fieldName
        const value = fieldValue
        dispatch({ type: ACTIONS.CHANGE_INPUT, payload: { name, value } })
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        dispatch({ type: ACTIONS.CHANGE_INPUT, payload: { name, value } })
    }

    const resetFields = () => dispatch({ type: ACTIONS.RESET, payload: initialState })

    const handleCancel = () => {
        resetFields()
        handleClose()
    }

    !!!state.meeting && addStateField('meeting', meetingId)
    !!!state.date && addStateField('date', date)

    const submitIsDisabled = !(
        state.meeting
        && state.contributor
        && state.amount
        && state.date
    )

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const result = await submitForm(ENDPOINTS.addContribution, state)
            if (result.success) resetFields()
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle textAlign='center'>
                Ajouter Contribution
            </DialogTitle>
            <DialogContent>
                &nbsp;
                <Stack spacing={2} component='form' onSubmit={handleSubmit}>
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
                        name='amount'
                        label='Montant'
                        value={state.amount || ''}
                        onChange={handleInputChange}
                        size='small'
                    />
                    <DialogActions>
                        <Button onClick={handleCancel} variant='outlined' size='small'>
                            Annuler
                        </Button>
                        <Button variant='contained' size='small' type='submit' disabled={submitIsDisabled}>
                            Enregistrer
                        </Button>
                    </DialogActions>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default ContributionDialog