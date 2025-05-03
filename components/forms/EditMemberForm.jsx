import { useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { editFormReducer } from '../../src/reducers/editFormReducer'
import { submitPutForm } from '../../src/utils/formSubmission'
import { ENDPOINTS } from '../../src/constants/endpoints'
import { MenuProps } from '../../src/constants/menuProps'

const EditMemberForm = ({ member, spouseList, parentList, childrenList, generations }) => {
    const [state, dispatch] = useReducer(editFormReducer, member)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [complete, setComplete] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (success) setSuccessMessage('Membre modifié. Redirection en cours...')
        let delayedAction = setTimeout(() => {
            setSuccessMessage('')
            setSuccess(false)
        }, 2000)
        return () => clearTimeout(delayedAction)
    }, [success])

    useEffect(() => {
        let delayedRedirection = setTimeout(() => {
            if (complete) router.push(`/members/${member._id}`)
        }, 2100)        
        return () => clearTimeout(delayedRedirection)
    }, [complete, router, member._id])

    const handleInputChange = e => {
        const { name, value } = e.target
        dispatch({ type: 'CHANGE_INPUT', payload: { name, value } })
    }

    const handleMultiChange = e => {
        const { name, value } = e.target
        const trueValue = typeof value === 'string' ? value.split(',') : value
        dispatch({ type: 'CHANGE_ARRAY', payload: { name, trueValue } })
    }

    const submitIsDisabled = !(state.lastName && state.email)

    const handleSubmit = async e => {
        e.preventDefault()
        delete state.gen
        try {
            const result = await submitPutForm(ENDPOINTS.editMember(member._id), state)
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
                <Typography variant='h4' sx={{ textAlign: 'center' }} gutterBottom>
                    Modifier Membre
                </Typography>
                <Grid
                    container
                    minWidth={{ md: '600px' }}
                    spacing={4}
                    mb={4}
                >
                    <Grid item xs={12} md={6}>
                        <Stack direction='column' spacing={3} maxWidth='270px'>
                            <TextField
                                type='text'
                                name='firstName'
                                label='Prénom'
                                InputLabelProps={{ shrink: true }}
                                value={state.firstName}
                                onChange={handleInputChange}
                                size='small'
                                fullWidth
                            />
                            <TextField
                                type='text'
                                name='lastName'
                                label='Nom'
                                InputLabelProps={{ shrink: true }}
                                value={state.lastName}
                                onChange={handleInputChange}
                                size='small'
                                fullWidth
                            />
                            <TextField
                                type='email'
                                name='email'
                                label='Email'
                                InputLabelProps={{ shrink: true }}
                                value={state.email}
                                onChange={handleInputChange}
                                size='small'
                                fullWidth
                            />
                            <TextField
                                type='text'
                                name='address'
                                label='Adresse'
                                InputLabelProps={{ shrink: true }}
                                value={state.address}
                                onChange={handleInputChange}
                                size='small'
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack direction='column' spacing={3} maxWidth='270px'>
                            <FormControl size='small'>
                                <InputLabel id='generation-label' >
                                    Génération
                                </InputLabel>
                                <Select
                                    labelId='generation-label'
                                    id='generation'
                                    label='Génération'
                                    name='generation'
                                    value={state.generation || ''}
                                    onChange={handleInputChange}
                                    MenuProps={MenuProps}
                                >
                                    {generations.map(g => (
                                        <MenuItem key={g._id} value={g._id} >
                                            {`${g.label} ${g.dependent ? 'à charge' : ''}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size='small'>
                                <InputLabel id='parents-label' >
                                    Parents
                                </InputLabel>
                                <Select
                                    labelId='parents-label'
                                    id='parents'
                                    label='Parents'
                                    name='parents'
                                    multiple
                                    multiline
                                    value={state.parents || ''}
                                    onChange={handleMultiChange}
                                    input={<OutlinedInput label='Parents' />}
                                    MenuProps={MenuProps}
                                >
                                    {parentList.map(p => (
                                        <MenuItem
                                            key={p._id}
                                            value={p._id}
                                        >
                                            {`${p.firstName} ${p.lastName}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size='small'>
                                <InputLabel id='spouse-label' >
                                    Conjoint(e)
                                </InputLabel>
                                <Select
                                    labelId='spouse-label'
                                    id='spouse'
                                    label='Conjoint(e)'
                                    name='spouse'
                                    value={state.spouse || ''}
                                    onChange={handleInputChange}
                                    MenuProps={MenuProps}
                                >
                                    {spouseList.map(s => (
                                        <MenuItem key={s._id} value={s._id}>
                                            {`${s.firstName} ${s.lastName}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size='small' >
                                <InputLabel id='children-label' >
                                    Enfants
                                </InputLabel>
                                <Select
                                    labelId='children-label'
                                    id='children'
                                    label='Enfants'
                                    name='children'
                                    multiple
                                    value={state.children || ''}
                                    onChange={handleMultiChange}
                                    input={<OutlinedInput label='Parents' />}
                                    MenuProps={MenuProps}
                                >
                                    {childrenList.map(c => (
                                        <MenuItem
                                            key={c._id}
                                            value={c._id}
                                        >
                                            {`${c.firstName} ${c.lastName}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
                <Box maxWidth={400} mx='auto' mt={{ xs: 2, md: 8 }}>
                    <Button
                        variant='contained'
                        type='submit'
                        disabled={submitIsDisabled}
                        fullWidth
                    >
                        Enregistrer Changements
                    </Button>
                </Box>
            </Box>
            {success && <Alert severity='success'>{successMessage}</Alert>}
        </Box>
    )
}

export default EditMemberForm