import { TextField, Container, Box, Select, InputLabel, MenuItem, Alert, Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddTicketMutation } from '../redux/api/ticketApi'
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send'

function AddTicket({ client }) {

    const manager = useSelector(state => state.user.currentUser.manager)

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const [addTicket, { isError }] = useAddTicketMutation()
    const [stage, setStage] = useState('')
    const [contactResult, setContactResult] = useState('')
    const [essenceOfContact, setEssenceOfContact] = useState('')

    const submitData = {
        stage, contactResult, essenceOfContact, client, manager
    }

    const handleAddTicket = async () => {
        try {
            await addTicket(submitData).unwrap()
        } catch (error) {
            console.log(error.error)
        }
    }

    return (
        <Container sx={{
            '& .MuiTextField-root': { mr: 1, mt:1, minWidth: 120 },
            '& .MuiSelect-select': { p:1, minWidth: 100 }
        }}>
            <Typography variant='h5'>
                Добавить тикет
            </Typography>
            <Stack spacing={2}
                direction="column"
                >
                <Box component='form' onSubmit={handleSubmit(handleAddTicket)}>
                    <TextField label='Результаты контакта' onChange={(e) => setContactResult(e.target.value)} value={contactResult} />
                    <TextField label='Суть контакта' onChange={(e) => setEssenceOfContact(e.target.value)} value={essenceOfContact} />


                    <InputLabel id='stage'>Этап</InputLabel>
                    <Select
                        labelId='stage'
                        id='stageId'
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                    >
                        <MenuItem value='Внимание'>Внимание</MenuItem>
                        <MenuItem value='Интерес'>Интерес</MenuItem>
                        <MenuItem value='Желание'>Желание</MenuItem>
                        <MenuItem value='Действие'>Действие</MenuItem>
                    </Select>
                    <Button type='submit' variant='filled' endIcon={<SendIcon />}>Отправить</Button>
                </Box>
            </Stack>
        </Container>
    )
}

export default AddTicket