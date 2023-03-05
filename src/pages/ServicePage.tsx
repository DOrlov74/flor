import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router";
import therapeutic from '../assets/back_opt.jpg';
import ultrasonic from '../assets/ultra_opt.jpg';
import paraffin from '../assets/parafina_opt.jpg';
import facial from '../assets/facial_opt.jpg';
import radio from '../assets/radio_opt.jpg';
import presso from '../assets/presso_opt.jpg';
import { services } from "../content/services";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { florPrimary, florSecondary } from "../theme/colors";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { containerStyle } from "../theme/styles";
import { useContext } from "react";
import { LangContext } from "../components/LanguageProvider";
import Footer from "../components/Footer";

const images = {
    'therapeutic': therapeutic, 
    'ultrasonic': ultrasonic,
    'paraffin': paraffin,
    'facial': facial,
    'radio': radio,
    'presso': presso
};

export default function ServicePage(){
    const {id} = useParams<{id: string}>();
    const service = services.find(s => (s.id === id));
    const {language}=useContext(LangContext);
    let image;
    Object.entries(images).find(([k, v]) => {
        if (k===id){
            image=v;
            return true;
        }else{
            return false;
        }});

    const imgStyle = {
        padding: '1rem',
    } as const;

    const buttonStyle = {
        '&, &:link, &.visited': {
            backgroundColor: florPrimary[50],
            textTransform: 'none',
            marginTop: '1rem'
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
                <Grid container spacing={{ xs: 2, md: 3 }} >
                    <Grid item xs={12} sm={6} >
                        <Box
                            component="div"
                            sx={imgStyle}>
                            <img width='100%' src={image} alt={language ? service?.name : service?.enName}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Box
                            component="div"
                            sx={imgStyle}>
                            <Typography gutterBottom variant="h5" component="div">
                                {language ? service?.name : service?.enName}
                            </Typography>
                            {language ? service?.content.map(c => (
                                <Typography key={c} variant="body2" >
                                    {c}
                                </Typography>
                            )) : 
                            service?.enContent.map(c => (
                                <Typography key={c} variant="body2" >
                                    {c}
                                </Typography>
                            ))
                            }
                            {language ? service?.list && (<>
                                <Typography variant="body2" > Consiste na: </Typography>
                                <List sx={{p: 0}}>
                                    {service?.list.map(li => (
                                        <ListItem key={li} sx={{py: 0}}>
                                            <ListItemText primaryTypographyProps={{variant: "body2"}}>
                                            - {li}
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                                </List></>) :
                                service?.enList && (<>
                                    <Typography variant="body2" > Consiste na: </Typography>
                                    <List sx={{p: 0}}>
                                        {service?.enList.map(li => (
                                            <ListItem key={li} sx={{py: 0}}>
                                                <ListItemText primaryTypographyProps={{variant: "body2"}}>
                                                - {li}
                                                </ListItemText>
                                            </ListItem>
                                        ))}
                                    </List></>)
                            }
                            <Typography variant="body1" color={florSecondary[900]}>
                                {language ? "Duração:" : "Duration:"} &ensp; {service?.duration} min
                            </Typography>
                            <Divider />
                                {service?.prices.map((p) => (
                                <>
                                <Stack key={p.address} direction="row" spacing={5}>
                                    <Typography gutterBottom variant="body1" color={florSecondary[900]}>
                                        {p.address} 
                                    </Typography>
                                    <Typography variant="body1" color={florSecondary[900]}>
                                        {p.price!=0?p.price:"sob consulta"} {p.price!=0?<span>&euro;</span>:''}
                                    </Typography>
                                </Stack>
                                <Divider key={`${p.address}  ${p.price}`} />
                                </>
                                ))}
                            <Button fullWidth sx={buttonStyle} component={Link} to={`/book/${id}`}>{language?"Marcar":"Book"}</Button>    
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
        <Footer/>
        </>
    );
}