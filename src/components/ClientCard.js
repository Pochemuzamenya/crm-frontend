import {
    Box, List, ListItem,
    ListItemText, Divider,
    ListItemIcon,
    Button,
    Dialog,
    DialogTitle,
    TextField,
    Alert
} from '@mui/material'
import React, { useState } from 'react'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CommentBankRoundedIcon from '@mui/icons-material/CommentBankRounded';
import { useUpdateClientMutation } from '../redux/api/clientsApi';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash'

function ClientCard({ client }) {
    const [open, setOpen] = useState(false)

    const [updateClient, { isError, isSuccess }] = useUpdateClientMutation()

    const manager = useSelector(state => state.user.currentUser.manager)

    const [id, setId] = useState(client.id)
    const [title, setTitle] = useState(client.title)
    const [taxIdentificationNumber, setTaxIdentificationNumber] = useState(client.taxIdentificationNumber)
    const [region, setRegion] = useState(client.region)
    const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber)
    const [email, setEmail] = useState(client.email)
    const [contactName, setContactName] = useState(client.contactName)
    const [comment, setComment] = useState(client.comment)
    const [clientAddress, setClientAddress] = useState(client.clientAddress)
    const [city, setCity] = useState(client.city)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitData = {
        id, title, taxIdentificationNumber,
        region, phoneNumber, email,
        contactName, comment, clientAddress, city, manager
    }

    async function update() {
        if (!isEqual(client, submitData)) {
            try {
                await updateClient(submitData).unwrap().then(console.log('success'))
            } catch (error) {
                console.log(`rejected with ${error}`)
            }
            setTitle(client.title)
            setTaxIdentificationNumber(client.taxIdentificationNumber)
            setRegion(client.region)
            setPhoneNumber(client.phoneNumber)
            setEmail(client.email)
            setContactName(client.contactName)
            setComment(client.comment)
            setClientAddress(client.clientAddress)
            setCity(client.city)
        }
    }

    return (
        <Box sx={{ flexGrow: 0.2, }}>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <BadgeRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={client.contactName} secondary="Имя контакта" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemIcon>
                        <PhoneAndroidRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={client.phoneNumber} secondary="Номер телефона" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemIcon>
                        <EmailRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={client.email} secondary="email" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemIcon>
                        <FmdGoodRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={client.region} secondary="Регион" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemIcon>
                        <LocationCityRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={client.city} secondary="Город" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemIcon>
                        <HomeRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={client.clientAddress} secondary="Адрес" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemIcon>
                        <AccountBalanceRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={client.taxIdentificationNumber} secondary="ИНН" />
                </ListItem>
                <Divider />
                <ListItem button >
                    <ListItemIcon>
                        <CommentBankRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={client.comment} secondary="Комментарий" />
                </ListItem>
            </List>
            <Button variant="outlined" onClick={handleClickOpen}>
                Редактировать
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{client.title}</DialogTitle>
                <TextField label='Название' variant="filled" onChange={(e) => setTitle(e.target.value)} value={title} />
                <TextField label='ИНН' variant="filled" onChange={(e) => setTaxIdentificationNumber(e.target.value)} value={taxIdentificationNumber} />
                <TextField label='Имя контакта' variant="filled" onChange={(e) => setContactName(e.target.value)} value={contactName} />
                <TextField label='Email' variant="filled" onChange={(e) => setEmail(e.target.value)} value={email} />
                <TextField label='Телефон' variant="filled" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                <TextField label='Регион' variant="filled" onChange={(e) => setRegion(e.target.value)} value={region} />
                <TextField label='Адрес' variant="filled" onChange={(e) => setClientAddress(e.target.value)} value={clientAddress} />
                <TextField label='Город' variant="filled" onChange={(e) => setCity(e.target.value)} value={city} />
                <TextField label='Комментарий' variant="filled" onChange={(e) => setComment(e.target.value)} value={comment} />
                <Button onClick={() => update()} >
                    Сохранить
                </Button>
                {isSuccess ? <Alert variant="filled" severity="success">
                    This is a success alert — check it out!
                </Alert> : <></>}
            </Dialog>

        </Box>
    )
}

export default ClientCard