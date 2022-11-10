import React, { useState } from 'react'
import { Box, Button, Collapse, Container, IconButton, Snackbar, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../redux/api/login'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../redux/slice/currentUserSlice'
import { useNavigate } from 'react-router-dom'
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

function LoginForm() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alertVision, setAlertVision] = useState(false)
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
        setAlertVision(true)
        console.log(error.error)
      }
      setPassword('')
      setUsername('')
    }
  }


  return (
    <Container maxWidth="sm">
      <Collapse in={alertVision}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertVision(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >Сервер недоступен
        </Alert>
      </Collapse>
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
    </Container >
  )
}

export default LoginForm