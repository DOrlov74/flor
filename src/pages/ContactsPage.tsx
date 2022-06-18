import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import Footer from "../components/Footer";
import { LangContext } from "../components/LanguageProvider";
//import { containerStyle } from "../theme/styles";

const containerStyle = {
        backgroundSize: 'cover',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        gap: '2rem',
        width: '100%',
        minHeight: 'calc(100vh - 128px)',
        padding: '1.5rem',
    } as const;

const mapContainerStyle = {
    overflow: 'hidden',
    pb: '40%',
    position: 'relative',
    height: 0
} as const;

const mapStyle = {
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    position: 'absolute'
} as const;

export default function ContactsPage() {
    const {language}=useContext(LangContext);
    
    return(
        <>
        <Container 
            sx={containerStyle}>
            <Grid container spacing={2} >
                <Grid item xs={12} >
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                    {language ? 'Lisboa' : 'Lisbon'}
                            </Typography>
                            <Box sx={mapContainerStyle} >
                                <iframe 
                                    title="Lisbon address"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d925.4748082383876!2d-9.12173261229878!3d38.7197881296985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19338f1af30c8b%3A0x576bfda952d8f5d0!2sFlor%20Massagem!5e0!3m2!1sru!2spt!4v1649678808945!5m2!1sru!2spt" 
                                    width="600" height="450" 
                                    style={mapStyle} 
                                    allowFullScreen={true} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </Box>
                        </CardContent>
                     </Card>
                </Grid>
                <Grid item xs={12} >
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {language ? 'Alfragide' : 'Alfragide'}
                            </Typography>
                            <Box sx={mapContainerStyle}>
                                <iframe 
                                    title="Alfragide address"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1850.570472209182!2d-9.21652284028104!3d38.73442477568835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ecce976a54a19%3A0x17f71061099ab692!2sPraceta%20Dr.%20Ant%C3%B3nio%20J%C3%BAlio%20Sim%C3%B5es%20de%20Aguiar%202%2C%202610-184%20Amadora!5e0!3m2!1sru!2spt!4v1649690530645!5m2!1sru!2spt" 
                                    width="600" height="450" 
                                    style={mapStyle} 
                                    allowFullScreen={true} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </Box>
                        </CardContent>
                     </Card>
                </Grid>
            </Grid>
        </Container>
        <Footer/>
        </>
    );
}