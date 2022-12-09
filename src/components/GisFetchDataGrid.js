import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress';
import React, { useEffect, useState } from 'react'
import GisList from '../components/GisList'
import { useSelector } from 'react-redux';
import { useAddClientMutation } from '../redux/api/clientsApi'
import { useLazyFetchCityByNameQuery, useLazyFetchPlaceByCityQuery } from '../redux/api/gisApi'


const columns = [
  { field: 'address_name', headerName: 'Адрес', width: 420 },
  { field: 'name', headerName: 'Название', width: 420 },
  { field: 'type', headerName: 'Тип объекта', width: 260 },
]

function GisFetchDataGrid({ data }) {

  const manager = useSelector(state => state.user.currentUser.manager)
  const [client, setClient] = useState({})

  const [addClient, { isError }] = useAddClientMutation()

  const [title, setTitle] = useState('')
  const [clientAddress, setClientAddress] = useState('')

  const [taxIdentificationNumber, setTaxIdentificationNumber] = useState('')
  const [region, setRegion] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [contactName, setContactName] = useState('')
  const [comment, setComment] = useState('')
  const [city, setCity] = useState('')

  const submitData = {
    title: client.name,
    clientAddress: client.address_name,
    manager,
    taxIdentificationNumber,
    region,
    phoneNumber,
    email,
    contactName,
    comment,
    city,
  }

  const handleClick = async () => {
    try {
      await addClient(submitData).unwrap()
    } catch (error) {
      console.log(`rejected with ${error}`)
    }
  }

  console.log(client)
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={data.data.result.items}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoPageSize
        experimentalFeatures={{ newEditingApi: true }}
        components={{

        }}
        onRowClick={(data) => {
          setClient(data.row)
        }}
      />
      <Button
        variant='contained'
        onClick={() => handleClick()}
      >send to base</Button>
    </Box>
  )
}

export default GisFetchDataGrid