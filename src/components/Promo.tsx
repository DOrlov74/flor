import { Stack } from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { moveInLeft } from "../theme/animation"
import { florPrimary, florSecondary } from "../theme/colors"
import { LangContext } from "./LanguageProvider"
import "@fontsource/comfortaa";
import { PageContext } from "./PageProvider"

const promoStyle = {
    fontSize: {xs:'1.2rem', md:'2rem'},
    textAlign: 'left',
    fontFamily: 'Comfortaa',
    fontWeight: 700,
    fontStyle: 'italic',
    animation: 'moveInLeft 2s ease-out',
    animationFillMode: 'both',
    '@keyframes moveInLeft': {...moveInLeft}
}

const commentStyle = {
    fontSize: {xs:'0.8rem', md:'1rem'},
    textAlign: 'left',
    fontFamily: 'Comfortaa',
    fontWeight: 500,
    fontStyle: 'italic',
    animation: 'moveInLeft 2s ease-out',
    animationFillMode: 'both',
    '@keyframes moveInLeft': {...moveInLeft}
}

const buttonStyle = {
    '&, &:link, &.visited': {
        fontFamily: 'Comfortaa',
        fontWeight: 700,
        fontStyle: 'italic',
        fontSize: '1rem',
        maxWidth: '15rem',
        margin: {xs:'0.5rem', md:'1rem'},
        color: florPrimary[700],
        borderRadius: '0.5rem',
        padding: '0.5rem 1rem',
        boxShadow: `5px 5px 5px ${florPrimary[900]}`,
        backgroundColor: florPrimary[50],
        transition: 'all .2s'
    },
    '&:hover': {
        backgroundColor: florSecondary[50],
        boxShadow: '5px 10px 10px black',
        transform: 'translateY(-5px)'
    },
    '&:active, &:focus': {
        boxShadow: `5px 7px 5px ${florPrimary[900]}`,
        transform: 'translateY(-2px)'
    }
}

const secondButtonStyle = {
    '&, &:link, &.visited': {
        fontFamily: 'Comfortaa',
        fontWeight: 700,
        fontStyle: 'italic',
        fontSize: '1rem',
        maxWidth: '15rem',
        margin: {xs:'0.5rem', md:'1rem'},
        color: florPrimary[50],
        borderRadius: '0.5rem',
        padding: '0.5rem 1rem',
        boxShadow: `5px 5px 5px ${florPrimary[900]}`,
        backgroundColor: florPrimary[700],
        transition: 'all .2s'
    },
    '&:hover': {
        backgroundColor: florPrimary[900],
        boxShadow: '5px 10px 10px black',
        transform: 'translateY(-5px)'
    },
    '&:active, &:focus': {
        boxShadow: `5px 7px 5px ${florPrimary[100]}`,
        transform: 'translateY(-2px)'
    }
}

export default function Home() {
    const {language}=useContext(LangContext);
    const {setPage}=useContext(PageContext);
    
    const handleClick = (event: any) => {
        if (setPage){
            setPage(event.target.id);
        }   
    };

    return(
        <>
            <Stack alignItems="flex-start" sx={{m: {xs:'1rem', md:'2rem'}}}>
                <Typography variant="h4" sx={promoStyle}>
                    {language ? 'Massagem terapeutica' : 'Therapeutic massage'}
                </Typography>
                <Typography variant="h4" sx={promoStyle}>
                    {language ? 'em Lisboa e Alfragide' : 'in Lisbon and Alfragide'}
                </Typography>
                <Typography variant="h6" sx={commentStyle}>
                    {language ? 'só por marcação' : 'by appointment'}
                </Typography>
                <Stack direction={'row'} spacing={5} sx={{m:{xs:'1rem 0.5rem', md:'2rem 1rem'}}}>
                    <Button color="secondary" size="large" disableRipple sx={buttonStyle} 
                        id="/book" onClick={handleClick} component={Link} to="/book">
                        {language ? 'Marcar agora' : 'Book now'}
                    </Button>
                    <Button color="primary" size="large" disableRipple sx={secondButtonStyle} 
                        id="/services" onClick={handleClick} component={Link} to="/services">
                        {language ? 'Ver preços' : 'Prices'}
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}