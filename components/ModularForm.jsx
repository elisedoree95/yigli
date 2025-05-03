import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import submitForm from '../src/utils/formSubmission'

const ModularForm = (props) => {
    const { data, members } = props
    const [formValues, setFormValues] = useState(data.initialValues)
    const [successMessage, setSuccessMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const { title } = data

    useEffect(() => {
        if (success) setSuccessMessage(`${title} created`)
        setTimeout(() => {
            setSuccessMessage('')
            setSuccess(false)
        }, 2000)
    }, [success, title])

    const handleInputChange = e => {
        const value = e.target.value
        setFormValues({ ...formValues, [e.target.name]: value })
    }

    const resetFields = () => {
        setFormValues(data.initialValues)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(data.endpoint)

        try {
            const result = await submitForm(data.endpoint, formValues)
            if (result.success) {
                setSuccess(true)
                resetFields()

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box display='flex' justifyContent='center' mt={2}>
            <Box component='form' width={300} onSubmit={handleSubmit}>
                <Typography variant='h4' gutterBottom sx={{ textAlign: 'center' }}>
                    Form Title
                </Typography>
                {data.fields.map(item => (
                    <Box key={item.name}>
                        {item.type === 'radio'
                            ? (
                                <FormControl>
                                    <FormLabel id={item.name}>{item.displayedText}</FormLabel>
                                    <RadioGroup row aria-labelledby={item.name} name={item.name}>
                                        {item.options.map(option => (
                                            <FormControlLabel
                                                key={option.key}
                                                value={option.value}
                                                control={<Radio checked={formValues[item.name] === option.value} onChange={handleInputChange} />}
                                                label={option.key}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )
                            : item.type === 'select'
                                ? (
                                    <>
                                        <FormControl>
                                            <InputLabel variant='standard' htmlFor={item.name}>
                                                {item.displayedText}
                                            </InputLabel>
                                            <NativeSelect
                                                onChange={handleInputChange}
                                                value={formValues[item.name]}
                                                inputProps={{
                                                    name: item.name,
                                                    id: item.name
                                                }}
                                            >
                                                {members.map(member => (
                                                    <option key={member._id} value={member._id}>
                                                        {`${member.firstName} ${member.lastName}`}
                                                    </option>
                                                ))}
                                            </NativeSelect>
                                        </FormControl>
                                        {/* <label htmlFor={item.name}>{item.displayedText}: </label>
                                        <select
                                            name={item.name}
                                            id={item.name}
                                            onChange={handleInputChange}
                                            value={formValues[item.name]}
                                        >
                                            <option value="">-- Choisissez un membre</option>
                                            {members.map(member => (
                                                <option key={member._id} value={member._id}>
                                                    {`${member.firstName} ${member.lastName}`}
                                                </option>
                                            ))}
                                        </select> */}
                                    </>
                                )
                                : (
                                    <TextField
                                        type={item.type}
                                        label={item.displayedText}
                                        name={item.name}
                                        id={item.name}
                                        value={formValues[item.name]}
                                        onChange={handleInputChange}
                                        size='small'
                                        fullWidth
                                    />
                                )
                        }
                        <br />
                        <br />
                    </Box>
                ))}
                <Button
                    variant='contained'
                    type='submit'
                    fullWidth
                >
                    Enregistrer
                </Button>
            </Box>
            <p>{successMessage}</p>
        </Box>
    )
}

export default ModularForm