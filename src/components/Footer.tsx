import { Divider, IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { useContext, useState } from "react";
import { addresses } from "../content/addresses";
import { LangContext } from "./LanguageProvider";
import SendMessageDialog from "./SendMessageDialog";
import TelegramIcon from '@mui/icons-material/Telegram';
import { Link } from "react-router-dom";

export default function Footer() {
    const {language}=useContext(LangContext);
    const [messageDialog, setMessageDialog] = useState(false);

    const handleClose = () => {
        setMessageDialog(false);
    };

    return(
        <AppBar position="absolute" sx={{top:'auto', bottom: '-64px', minHeight: '64px'}}>
            <Container maxWidth="xl">
                <Toolbar sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'} , justifyContent: 'space-around'}}>
                        <Typography variant={'body2'}>
                            {addresses[0].address} 
                        </Typography>
                        <Divider color='white' orientation= "vertical" variant="middle" flexItem />
                        <IconButton sx={{color:'white'}} onClick={()=>setMessageDialog(true)}>
                            <TelegramIcon sx={{mx: '1rem'}} />
                            <Typography variant={'body2'}>
                                {language ? 'Enviar a mensagem' : 'Send a message' } 
                            </Typography>
                        </IconButton>
                        <Divider color='white' orientation= "vertical" variant="middle" flexItem />
                        <Typography variant={'body2'} 
                            component={Link} to={'/privacy'} 
                            sx={{color: 'white', textDecoration: 'none'}}>
                            {language ? 'Política de privacidade' : 'Privacy policy' } 
                        </Typography>
                </Toolbar>
                <SendMessageDialog open={messageDialog} handleClose={handleClose}/>
            </Container>
        </AppBar>
    );
}