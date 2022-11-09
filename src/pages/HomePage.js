import { Button, Container, Fab, Stack, Typography } from '@mui/material'
import { redirect, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useMemo, useEffect } from 'react'
import { useGetManagerQuery, useLazyGetManagerQuery } from '../redux/api/managerApi'
import AddClient from './AddClient'
import { useDispatch, useSelector } from 'react-redux';
import ClientsGrid from '../components/ClientsGrid';
import { setCurrentManager } from '../redux/slice/managerSlice';

function HomePage() {

  const navigate = useNavigate()

  const manager = useSelector(state => state.user.currentUser.manager)



  return (
    <Container maxWidth="xl">
      <Stack spacing={3} >
        <Typography variant='h3' sx={{ textAlign: 'center', }}>
          {manager.firstname?`Привет ${manager.firstname}`: 'Ты как сюда попал'}
        </Typography>
        <ClientsGrid />
        <Fab color='primary' aria-label='add' onClick={() => navigate('/add')} >
          <AddIcon />
        </Fab>
      </Stack>
    </Container>
  )
}

export default HomePage