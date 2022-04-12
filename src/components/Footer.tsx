import { Divider, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Fragment, useContext } from "react";
import { addresses } from "../content/addresses";
import { LangContext } from "./LanguageProvider";

export default function Footer() {
    const {language}=useContext(LangContext);

    return(
        <AppBar position="absolute" sx={{top:'auto', bottom: '-64px', minHeight: '64px'}}>
            <Container maxWidth="xl">
                <Toolbar sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'} , justifyContent: 'space-between'}}>
                    <Typography variant={'body2'}>
                        {language ? 'Os nosos contactos:' : 'Our contacts:'}
                    </Typography>
                    {addresses.map(address => 
                    <Fragment key ={address.name}>
                        <Divider color='white' orientation= "vertical" variant="middle" flexItem />
                        <Typography variant={'body2'}>
                            {address.address} 
                        </Typography>
                    </Fragment>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}