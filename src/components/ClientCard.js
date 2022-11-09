import {
    Box, List, ListItem,
    ListItemText, Divider,
    ListItemIcon
} from '@mui/material'
import React from 'react'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CommentBankRoundedIcon from '@mui/icons-material/CommentBankRounded';

function ClientCard({ client }) {

    return (
        <Box sx={{flexGrow: 0.2,}}>
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
        </Box>
    )
}

export default ClientCard