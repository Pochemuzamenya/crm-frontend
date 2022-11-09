import React, { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useGetClientsQuery } from '../redux/api/clientsApi'

const columns = [
    { id: 'title', label: 'Название', minWidth: 170, format: (value) => value.toLocaleString('en-US'), },
    { id: 'taxIdentificationNumber', label: 'ИНН', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
    { id: 'contactName', label: 'Имя контакта', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
    { id: 'email', label: 'Email', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
    { id: 'phoneNumber', label: 'Телефон', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
    { id: 'region', label: 'Регион', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
    { id: 'clientAddress', label: 'Адрес', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
    { id: 'comment', label: 'Комментарий', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
]

function ClientTable() {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const { data = [], isLoading } = useGetClientsQuery()

    if (isLoading) return <h1>Loading...</h1>

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((client) => {
                                return (
                                    <TableRow onClick={() => console.log(client)} hover role="checkbox" tabIndex={-1} key={client.id}>
                                        {columns.map((column) => {
                                            const value = client[column.id]
                                            return (
                                                <TableCell key={column.id}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default ClientTable