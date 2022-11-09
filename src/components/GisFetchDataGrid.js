import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react'


const columns = [
  { field: 'address_name', headerName: 'Адрес', width: 420 },
  { field: 'name', headerName: 'Название', width: 420 },
  { field: 'type', headerName: 'Тип объекта', width: 260 },
]

function GisFetchDataGrid({ data }) {


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
      />
    </Box>
  )
}

export default GisFetchDataGrid