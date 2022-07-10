import { Divider, IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { useContext, useEffect, useState } from "react";
import { addresses } from "../content/addresses";
import { LangContext } from "./LanguageProvider";
import SendMessageDialog from "./SendMessageDialog";
import TelegramIcon from '@mui/icons-material/Telegram';
import { Link } from "react-router-dom";
import { moveOutBottom } from "../theme/animation";

interface Props {
    pos?: number;
}

const footerStyle = {
    top: 'auto', bottom: 0, height: {xs:'132px', md:'64px'},
}

const slideOutStyle = {
    top: 'auto', bottom: 0, height: {xs:'132px', md:'64px'},
    animation: 'moveOutBottom 2s ease-out',
    animationFillMode: 'both',
    '@keyframes moveOutBottom': {...moveOutBottom}
}

export default function Footer({pos}: Props) {
    const {language}=useContext(LangContext);
    const [messageDialog, setMessageDialog] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
        pos!==undefined && pos > 0 && pos < 64 ? setChecked(true) : setChecked(false);
    }, [pos])

    const handleClose = () => {
        setMessageDialog(false);
    };

    return(
        <AppBar position={pos!==undefined && pos<64 ? "fixed" : "static"} sx={checked? slideOutStyle : footerStyle } >
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