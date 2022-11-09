import { Box, LinearProgress } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import { useGetTicketByClientQuery } from '../redux/api/ticketApi'

const columns = [
    { field: 'stage', headerName: 'Стадия', headerAlign: 'center', width: 260 },
    { field: 'contactResult', headerName: 'Результаты', headerAlign: 'center', width: 220 },
    { field: 'date', headerName: 'Дата создания', headerAlign: 'center', width: 220 },
    { field: 'essenceOfContact', headerName: 'Суть контакта', headerAlign: 'center', width: 260 },
]

function TicketGrid({ client }) {

    const { data = [], isLoading } = useGetTicketByClientQuery(client.id)

    return (
        <Box sx={{ height: 400 }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoPageSize
                experimentalFeatures={{ newEditingApi: true }}
                components={{
                    LoadingOverlay: LinearProgress,
                    Toolbar: GridToolbar
                }}
                loading={isLoading}
            />
        </Box>
    )
}

export default TicketGrid