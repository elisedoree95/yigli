import { useState, useEffect } from "react"

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import submitForm from '../../src/utils/formSubmission'
import { ENDPOINTS } from '../../src/constants/endpoints'

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    sex: ''
}

const sexOptions = [
    { value: 'female', key: 'F' },
    { value: 'male', key: 'M' }
]

const AddMemberForm = () => {
    const [formValues, setFormValues] = useState(initialValues)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        if (success) setSuccessMessage('Membre ajouté.')
        let delayedAction = setTimeout(() => {
            setSuccessMessage('')
            setSuccess(false)
        }, 2000)
        return () => clearTimeout(delayedAction)
    }, [success])

    const handleInputChange = (e) => {
        const value = e.target.value
        setFormValues({ ...formValues, [e.target.name]: value })
    }

    const resetFields = () => {
        setFormValues(initialValues)
    }

    const submitIsDisabled = !(formValues.lastName && formValues.email && formValues.sex)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Submit form
        try {
            const result = await submitForm(ENDPOINTS.addMember, formValues)
            if (result.success) {
                setSuccess(true)
                resetFields()
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center' mt={3}>
            <Box component='form' width={300} onSubmit={handleSubmit} mb={2}>
                <Typography variant='h4' sx={{ textAlign: 'center' }} gutterBottom>
                    Nouveau Membre
                </Typography>
                <Stack direction='column' spacing={3}>
                    <TextField
                        type='text'
                        name='firstName'
                        label='Prénom'
                        value={formValues.firstName}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
                    <TextField
                        type='text'
                        name='lastName'
                        label='Nom'
                        value={formValues.lastName}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
                    <TextField
                        type='email'
                        name='email'
                        label='Email'
                        value={formValues.email}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
                    <TextField
                        type='password'
                        name='password'
                        label='Mot de passe'
                        value={formValues.password}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
                    <TextField
                        type='text'
                        name='address'
                        label='Adresse'
                        value={formValues.address}
                        onChange={handleInputChange}
                        size='small'
                        fullWidth
                    />
                    <FormControl>
                        <FormLabel id='sex'>Sexe</FormLabel>
                        <RadioGroup aria-labelledby='sex' name='sex'>
                            {sexOptions.map(option => (
                                <FormControlLabel
                                    key={option.key}
                                    value={option.value}
                                    control={<Radio checked={formValues['sex'] === option.value} onChange={handleInputChange} />}
                                    label={option.key}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>

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

export default AddMemberForm