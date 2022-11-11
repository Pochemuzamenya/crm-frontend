import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {
    Box, Slide, Dialog,
    AppBar, Toolbar, IconButton,
    Typography, Button,
    Stack,
    Grid, Container
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useGetClientsQuery } from '../redux/api/clientsApi'
import LinearProgress from '@mui/material/LinearProgress';
import TicketGrid from './TicketGrid';
import ClientCard from './ClientCard';
import AddTicket from './AddTicket';

const columns = [
    { field: 'title', headerName: 'Название', headerAlign: 'center', width: 120 },
    { field: 'taxIdentificationNumber', headerName: 'ИНН', headerAlign: 'center', width: 120 },
    { field: 'contactName', headerName: 'Имя контакта', headerAlign: 'center', width: 160 },
    { field: 'email', headerName: 'Email', headerAlign: 'center', width: 160 },
    { field: 'city', headerName: 'Город', headerAlign: 'center', width: 160 },
    { field: 'phoneNumber', headerName: 'Телефон', headerAlign: 'center', width: 140 },
    { field: 'region', headerName: 'Регион', headerAlign: 'center', width: 140 },
    { field: 'clientAddress', headerName: 'Адрес', headerAlign: 'center', width: 180 },
    { field: 'comment', headerName: 'Комментарий', headerAlign: 'center', width: 250 },
]

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ClientsGrid() {

    const { data = [], isLoading } = useGetClientsQuery()

    const [open, setOpen] = useState(false);
    const [client, setClient] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoPageSize
                experimentalFeatures={{ newEditingApi: true }}
                components={{
                    LoadingOverlay: LinearProgress,
                }}
                loading={isLoading}
                onRowClick={(data) => {
                    setClient(data.row)
                    handleClickOpen()
                }}
            />
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {client.title}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid marginTop='20px' container spacing={2}>
                    <Grid container xs={3}>
                        <Container>
                            <ClientCard client={client} />
                        </Container>
                    </Grid>
                    <Grid container xs={9}>
                        <Container>
                            <TicketGrid client={client} />
                        </Container>
                        <Container>
                            <AddTicket client={client} />
                        </Container>
                    </Grid>
                </Grid>
            </Dialog>
        </Box>
    )
}

export default ClientsGrid