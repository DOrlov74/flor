import { Stack } from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { moveInLeft } from "../theme/animation"
import { florPrimary, florSecondary } from "../theme/colors"
import { LangContext } from "./LanguageProvider"
import "@fontsource/comfortaa";

const promoStyle = {
    textAlign: 'center',
    m: '1rem',
    fontFamily: 'Comfortaa',
    fontWeight: 700,
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
        fontSize: '1.2rem',
        margin: '1rem auto',
        color: florPrimary[700],
        borderRadius: '5rem',
        padding: '1.5rem 3rem',
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

export default function Home() {
    const {language}=useContext(LangContext);
    
    return(
        <>
            <Stack >
                <Typography variant="h4" sx={promoStyle}>
                    {language ? 'Massagem terapeutica' : 'Therapeutic massage'}
                </Typography>
                <Typography variant="h4" sx={promoStyle}>
                    {language ? 'em Lisboa e Alfragide' : 'in Lisbon and Alfragide'}
                </Typography>
                <Typography variant="h6" sx={promoStyle}>
                    {language ? 'só por marcação' : 'by appointment'}
                </Typography>
            </Stack>
            <Button color="secondary" size="large" disableRipple sx={buttonStyle} component={Link} to="/book">
                {language ? 'Marcar agora' : 'Book now'}
            </Button>
        </>
    )
}