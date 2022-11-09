import React from 'react'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {Typography, IconButton} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBarAuthHead({ user }) {
    const navigation = useNavigate()
    return (
        <>
            {user.manager.role === 'ROLE_ADMIN' ? <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <AdminPanelSettingsIcon />
                <Typography>
                    Админка
                </Typography>
            </IconButton> : <></>}
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => navigation('/2gis')}
            >
                <ManageSearchIcon />
                <Typography>
                    Поиск клиентов
                </Typography>
            </IconButton>
        </>
    )
}

export default NavBarAuthHead