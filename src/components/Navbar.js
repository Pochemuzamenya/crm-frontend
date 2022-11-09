import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../redux/slice/currentUserSlice'
import { Avatar } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import NavBarAuthHead from './NavBarAuthHead';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {

  const user = useSelector(state => state.user.currentUser)

  const dispatch = useDispatch()

  const navigation = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigation('/home')}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRM sys
          </Typography>
          {user.isAuth ? <NavBarAuthHead user={user} /> : <></>}
          {user.isAuth ? <Avatar alt={user.manager.firstname} src={user.manager.avatarURL} /> : <LoginIcon />}
          {user.isAuth ?
            <Button color="inherit" onClick={() => dispatch(logout())} >Выйти</Button>
            : <Typography>Войти</Typography>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar