import React, { useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../redux/api/login'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../redux/slice/currentUserSlice'
import { useNavigate } from 'react-router-dom'
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import Alert from '@mui/material/Alert';

function LoginForm() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const navigation = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const [login, { isError }] = useLoginMutation()

  const submitData = `username=${username}&password=${password}`

  const handleLogin = async () => {
    if (username && password) {
      try {
        const res = await login(submitData).unwrap()
        dispatch(setCurrentUser(res))
        navigation('/home')
      } catch (error) {
        <Alert severity='error'>Сервер недоступен</Alert>
        console.log(error.error)
      }
      setPassword('')
      setUsername('')
    }
  }


  return (
    <Container maxWidth="sm">
        
      <Box component='form' onSubmit={handleSubmit(handleLogin)} sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }} >
        <Typography variant="h3" margin={8}>
          Login <LoginSharpIcon color='primary' fontSize='large' />
        </Typography>
        <TextField label='Username' variant='outlined' onChange={(e) => setUsername(e.target.value)} value={username} />
        <TextField label='Password' variant='outlined' type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <Button type="submit" variant='contained'>Вход</Button>
      </Box>
    </Container>
  )
}

export default LoginForm