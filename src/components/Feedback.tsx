import { Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { LangContext } from "./LanguageProvider";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { florPrimary } from "../theme/colors";

const quoteStyle = {
    fontSize: {xs:'1rem', md:'1.2rem'},
    lineHeight: '1.2rem',
    textAlign: 'left',
    fontFamily: 'kaushan-script',
    fontWeight: 500,
    fontStyle: 'italic',
}
const nameStyle = {
    fontSize: {xs:'0.6rem', md:'0.8rem'},
    textAlign: 'right',
    fontWeight: 500,
    fontStyle: 'italic',
    ml: 'auto',
}


export default function Feedback(){
    const {language}=useContext(LangContext);
    
    return(
        <Stack alignItems="flex-start" sx={{m: {xs:'1rem', md:'2rem'}}}>
            <Typography variant="h6" sx={{mb: '1rem'}}>
                    {language ? 'Os clientes disem...' : 'Customers say...'}
            </Typography>
            <Card sx={{mt: '0.5rem', backgroundColor: 'rgba(0,0,0, 0.3)', color: 'white'}}>
                <CardContent sx={{p: '0.3rem 0.3rem 0 0.3rem'}}>
                    <Stack direction={'row'}>
                        <FormatQuoteIcon sx={{width: '1rem'}}/>
                        <Typography variant="h6" sx={quoteStyle}>
                                {language ? 'Nada substitui as suas mãos' : 'Nothing replaces your hands'}
                        </Typography>
                        <FormatQuoteIcon sx={{width: '1rem'}}/>
                    </Stack>
                </CardContent>
                <CardActions sx={{p: '0 0.3rem 0 0.5rem'}}>
                    <Typography variant="subtitle1" sx={nameStyle}>
                            Martine
                    </Typography>
                </CardActions>
            </Card>
            <Card sx={{mt: '0.5rem', backgroundColor: 'rgba(0,0,0, 0.3)', color: 'white'}}>
                <CardContent sx={{p: '0.3rem 0.3rem 0 0.3rem'}}>
                    <Stack direction={'row'} sx={{mt: '0.5rem'}}>
                        <FormatQuoteIcon sx={{width: '1rem'}}/>
                        <Typography variant="h6" sx={quoteStyle}>
                                {language ? 'As suas mãos deixaram-me com o corpo e alma muito feliz!' : 'Your hands left me with a very happy body and soul!'}
                        </Typography>
                        <FormatQuoteIcon sx={{width: '1rem'}}/>
                    </Stack>
                </CardContent>
                <CardActions sx={{p: '0 0.3rem 0 0.5rem'}}>
                    <Typography variant="subtitle1" sx={nameStyle}>
                            Rui
                    </Typography>
                </CardActions>
            </Card>
            <Card sx={{mt: '0.5rem', backgroundColor: 'rgba(0,0,0, 0.3)', color: 'white'}}>
                <CardContent sx={{p: '0.3rem 0.3rem 0 0.3rem'}}>
                    <Stack direction={'row'} sx={{mt: '0.5rem'}}>
                        <FormatQuoteIcon sx={{width: '1rem'}}/>
                        <Typography variant="h6" sx={quoteStyle}>
                                {language ? 'Ontem senti me um bocado dorida mas hoje ja estou bem' : "Yesterday I felt a little sore but today I'm fine"}
                        </Typography>
                        <FormatQuoteIcon sx={{width: '1rem'}}/>
                    </Stack>
                </CardContent>
                <CardActions sx={{p: '0 0.3rem 0 0.5rem'}}>
                    <Typography variant="subtitle1" sx={nameStyle}>
                            Patricia
                    </Typography>
                </CardActions>
            </Card>
        </Stack>
    )
}