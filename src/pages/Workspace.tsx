import { Box, Button, Divider, Grid, Paper, Stack, Typography, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { LangContext } from "../components/LanguageProvider";
import { florPrimary, florSecondary } from "../theme/colors";
import { containerStyle } from "../theme/styles";
import workspace from '../assets/workspace_1.jpg';
import workspace2 from '../assets/workspace_2.jpg';
import workspace3 from '../assets/workspace_3.jpg';
import StarIcon from '@mui/icons-material/Star';

export default function Workspace(){
    const {language}=useContext(LangContext);
    const imgStyle = {
        padding: '1rem',
    } as const;

    const buttonStyle = {
        '&, &:link, &.visited': {
            backgroundColor: florPrimary[50],
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: florSecondary[50],
        },
        '&:active, &:focus': {

        }
    } as const;
    return(
        <>
        <Box
            component="div"
            sx={containerStyle}>
            <Paper sx={{maxWidth: '900px'}}>
                <Box
                    component="div"
                    sx={imgStyle}>
                    <Stack direction="row" sx={{justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Typography gutterBottom variant="h5" component="div" align="center">
                            {language ? 'Espaço de massagem' : 'Massage workspace'}
                        </Typography>
                        <Typography gutterBottom component="div" sx={{pb: '0.25rem'}}>
                            {language ? ', na minha casa em Lisboa' : ', at my home in Lisbon'}
                        </Typography>
                    </Stack>
                    <List sx={{p: 0}}>
                    <Grid container  sx={{pb: '0.5rem'}}>
                    <Grid item xs={12} sm={6} >
                        <ListItem sx={{py: 0}}>
                            <ListItemIcon sx={{color: florSecondary[700]}}>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText >
                                {language ? 'Ambiente acolhedor':'Cozy atmosphere'}
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{py: 0}}>
                            <ListItemIcon sx={{color: florSecondary[700]}}>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText >
                                {language ? 'Marquesa com aquecimento':'massage table with heating'}
                            </ListItemText>
                        </ListItem>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                        <ListItem sx={{py: 0}}>
                            <ListItemIcon sx={{color: florSecondary[700]}}>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText >
                                {language ? 'Ambiente privado':'Private environment'}
                            </ListItemText>
                        </ListItem>
                        <ListItem sx={{py: 0}}>
                            <ListItemIcon sx={{color: florSecondary[700]}}>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText >
                                {language ? 'Música relaxante':'Relaxing music'}
                            </ListItemText>
                        </ListItem>
                        </Grid>
                        </Grid>
                    </List> 
                
                    <img width='100%' src={workspace} alt={language ? 'o nosso espaço' : 'our workspace'}/>
                    <img width='100%' src={workspace2} alt={language ? 'o nosso espaço imagem2' : 'our workspace image2'}/>
                    <img width='100%' src={workspace3} alt={language ? 'o nosso espaço imagem3' : 'our workspace image3'}/>
                </Box>
                <Box
                    component="div"
                    sx={imgStyle}>
                    <Button fullWidth sx={buttonStyle} component={Link} to={`/sendmessage`}>{language?"Marcar a massagem":"Book the massage"}</Button>
                </Box>
            </Paper>
        </Box>
        <Footer/>
        </>
    );
}