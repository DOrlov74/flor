import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Tab, Tabs, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import portuguese from "../assets/portugal.svg";
import english from "../assets/united-kingdom.svg";
import { MItem } from "../models/Links";
import { Link, useNavigate } from "react-router-dom";
import LoginDialog from "./LoginDialog";
import { UserContext } from "./UserProvider";
import { logout } from "../firebase/auth";
import { MessageContext } from "./MessageProvider";
import SigninDialog from "./SigninDialog";
import { LangContext } from "./LanguageProvider";

const pages:MItem[] = [
    {PName:'Início', EName:'Home', LinkTo:'/'}, 
    {PName:'Serviços', EName:'Services', LinkTo:'/services'}, 
    {PName:'Marcar', EName:'Book', LinkTo:'/book'}, 
    {PName:'Contactos', EName:'Contacts', LinkTo:'/contacts'}];

export default function Header(){
    const langCtx=useContext(LangContext);
    const {language, setLanguage}=langCtx;
    const appMessageCtx=useContext(MessageContext);
    const userCtx=useContext(UserContext);
    const user = userCtx?.user;
    let navigate = useNavigate();
    
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [value, setValue] = useState(0);

    const [signin, setSignin] = useState(false);
    const [login, setLogin] = useState(false);
    const handleClickOpen = (event: any) => {
        event.currentTarget.name === 'login' ? setLogin(true) : setSignin(true);
    };

    const handleClose = () => {
        setLogin(false);
        setSignin(false);
    };

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);  
    };

    const handleCloseNavMenu = (event: any) => {
        setAnchorElNav(null);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleCloseUserMenu = (event: any) => {
        setAnchorElUser(null);
        switch (event.currentTarget.name){
            case 'login':
                setLogin(true);
                break;
            case 'signin':
                setSignin(true);
                break;
            case 'logout':
                logout(appMessageCtx);
                break;
            case 'settings':
                navigate('/settings');
                break;
            case 'bookings':
                navigate('/bookings');
                break;
        }
    };

    const handleLogout = () => {
        logout(appMessageCtx);
    };

    const HandleSwitchLang = () => {
        if (setLanguage) setLanguage(!language);
    };

    return (
        <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Box
                    component="img"
                    sx={{ height: 50, mr: 2, display: { xs: 'none', md: 'flex' } }}
                    src={logo} 
                    alt="Flor massagem logo"
                />

                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                        {pages.map((page) => (
                            <MenuItem key={page.EName} onClick={handleCloseNavMenu} component={Link} to={page.LinkTo}>
                                <Typography textAlign="center">{language ? page.PName : page.EName}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Box
                    component="img"
                    sx={{ height: 50, flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    src={logo} 
                    alt="Flor massagem logo"
                />

                <Box sx={{ alignSelf: 'flex-end', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="Flor tabs menu"
                        >
                        {pages.map((page) => (
                        <Tab
                            key={page.EName}
                            // value={page.LinkTo}
                            label={language ? page.PName : page.EName}
                            component={Link} to={page.LinkTo}
                            sx={{ color: 'white', display: 'block' }}
                        />
                        ))}
                    </Tabs>
                </Box>
                <IconButton onClick={HandleSwitchLang}>
                    <Avatar
                        //component="img"
                        sx={{ height: 30, flexGrow: 0, display: 'flex' }}
                        src={language ? english : portuguese} 
                        alt="Switch language logo"
                        />
                </IconButton>
                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }}}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ px: '1rem' }}>
                        {user ? 
                            <Avatar alt={user.displayName ? user.displayName : "unknown"} 
                                src={(user.photoURL) ? user.photoURL : "/static/images/avatar/2.jpg"} />:
                            <SettingsIcon sx={{ color: 'white' }}/>
                        }
                    </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ 
                            display: { xs: 'block', md: 'none' },
                            mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {user && <MenuItem 
                            component={Button}
                            onClick={handleCloseUserMenu} 
                            name='settings'
                            sx={{textTransform: 'none'}}
                            disableRipple={true}
                            >
                            <Typography textAlign="center">{language ? 'Definições' : 'Settings'}</Typography>
                        </MenuItem> 
                        }
                        {user && <MenuItem 
                            component={Button}
                            onClick={handleCloseUserMenu} 
                            name='bookings'
                            sx={{textTransform: 'none'}}
                            disableRipple={true}
                            >
                            <Typography textAlign="center">{language ? 'Marcações' : 'Bookings'}</Typography>
                        </MenuItem> 
                        }
                        {(user?.role === 'admin') && <MenuItem 
                            component={Button}
                            onClick={handleCloseUserMenu} 
                            name='vacancies'
                            sx={{textTransform: 'none'}}
                            disableRipple={true}
                            >
                            <Typography textAlign="center">{language ? 'Vagas' : 'Vacancies'}</Typography>
                        </MenuItem> 
                        }
                        {user?
                        <MenuItem 
                            component={Button}
                            onClick={handleCloseUserMenu} 
                            name='logout'
                            sx={{textTransform: 'none'}}
                            disableRipple={true}
                            >
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem> :
                        <MenuItem 
                            component={Button}
                            onClick={handleCloseUserMenu} 
                            name='login'
                            sx={{textTransform: 'none'}}
                            disableRipple={true}
                            >
                            <Typography textAlign="center">Login</Typography>
                        </MenuItem> }
                        {!user && <MenuItem 
                            component={Button}
                            onClick={handleCloseUserMenu} 
                            name='signin'
                            sx={{textTransform: 'none'}}
                            disableRipple={true}
                            >
                            <Typography textAlign="center">Signin</Typography>
                        </MenuItem> 
                        }
                        {/* {settings.map((setting) => (
                            <MenuItem key={setting.Name} onClick={handleCloseUserMenu} component={Link} to={setting.LinkTo}>
                                <Typography textAlign="center">{setting.Name}</Typography>
                            </MenuItem>
                        ))} */}
                    </Menu>
                </Box>
                <Box sx={{ minHeight: '48px', alignSelf: 'center', flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                    <Stack direction="row" spacing={0} sx={{alignItems: 'center'}}>
                        {user? 
                            <><Avatar 
                                alt={user.displayName ? user.displayName : "unknown"} 
                                src={(user.photoURL) ? user.photoURL : "/static/images/avatar/2.jpg"} 
                                /> 
                            <Typography sx={{p: '0.5rem'}}>{user.displayName}</Typography>
                            <Button 
                                sx={{ color: 'white', display: 'block', textTransform: 'none' }}
                                component={Link} to='/settings'>
                                    {language ? 'Definições' : 'Settings'}
                            </Button>
                            <Button 
                                sx={{ color: 'white', display: 'block', textTransform: 'none' }}
                                component={Link} to='/bookings'>
                                    {language ? 'Marcações' : 'Bookings'}
                            </Button>
                            <Button 
                                sx={{ color: 'white', display: 'block', textTransform: 'none' }}
                                onClick={handleLogout}>
                                    Logout
                            </Button>
                            {user.role === 'admin' && 
                            <Button 
                                sx={{ color: 'white', display: 'block', textTransform: 'none' }}
                                component={Link} to='/vacancies'>
                                    {language ? 'Vagas' : 'Vacancies'}
                            </Button>}
                            </>:
                            <><Button 
                                name='login'
                                sx={{ color: 'white', display: 'block', textTransform: 'none' }}
                                onClick={handleClickOpen}>
                                    Login
                            </Button>
                            <Button 
                                name='signin'
                                sx={{ color: 'white', display: 'block', textTransform: 'none' }}
                                onClick={handleClickOpen}>
                                    Signin
                            </Button>
                            </>
                        }
                        {/* {settings.map((setting) => (
                        <Button
                            key={setting.Name}
                            // component={Link} to={setting.LinkTo}
                            sx={{ color: 'white', display: 'block' }}
                            onClick={handleClickOpen}
                        >{setting.Name}</Button>
                        ))} */}
                    </Stack>
                </Box>
            </Toolbar>
            <LoginDialog open={login} handleClose={handleClose}/>
            <SigninDialog open={signin} handleClose={handleClose}/>
        </Container>
        </AppBar>
    );
}