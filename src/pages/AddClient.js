import { Container, Box, TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { useAddClientMutation } from '../redux/api/clientsApi'
import { useNavigate } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send'


function AddClient() {


    const manager = useSelector(state => state.user.currentUser.manager)

    const [addClient, { isError }] = useAddClientMutation()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const [title, setTitle] = useState('')
    const [taxIdentificationNumber, setTaxIdentificationNumber] = useState('')
    const [region, setRegion] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [contactName, setContactName] = useState('')
    const [comment, setComment] = useState('')
    const [clientAddress, setClientAddress] = useState('')
    const [city, setCity] = useState('')

    const submitData = {
        title, taxIdentificationNumber,
        region, phoneNumber, email,
        contactName, comment, clientAddress, city, manager
    }

    const navigate = useNavigate()

    const handleAddClient = async () => {
        try {
            await addClient(submitData).unwrap()
            navigate('/home')
        } catch (error) {
            console.log(`rejected with ${error}`) 
        }
    }

    return (
        <Container sx={{
            '& .MuiTextField-root': { m: 2, width: '40ch' },
        }}>

            <Typography variant='h2' textAlign='center'>
                Добавить клиента
            </Typography>
            <Box
                component='form'
                onSubmit={handleSubmit(handleAddClient)}
            >
                <Box sx={{
                    display: 'flex',
                    flexFlow: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        maxWidth: '800px',
                        width: '100%',
                        background: '#fff',
                        padding: '25px 30px'
                    }}>
                        <TextField label='Название' variant="filled" onChange={(e) => setTitle(e.target.value)} value={title} />
                        <TextField label='ИНН' variant="filled" onChange={(e) => setTaxIdentificationNumber(e.target.value)} value={taxIdentificationNumber} />


                        <TextField label='Имя контакта' variant="filled" onChange={(e) => setContactName(e.target.value)} value={contactName} />
                        <TextField label='Email' variant="filled" onChange={(e) => setEmail(e.target.value)} value={email} />


                        <TextField label='Телефон' variant="filled" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                        <TextField label='Регион' variant="filled" onChange={(e) => setRegion(e.target.value)} value={region} />


                        <TextField label='Адрес' variant="filled" onChange={(e) => setClientAddress(e.target.value)} value={clientAddress} />
                        <TextField label='Город' variant="filled" onChange={(e) => setCity(e.target.value)} value={city} />


                        <TextField label='Комментарий' variant="filled" onChange={(e) => setComment(e.target.value)} value={comment} />
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button
                        type='submit'
                        variant='contained'
                        endIcon={<SendIcon />}
                    >
                        Отправить
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default AddClient