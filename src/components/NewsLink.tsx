import { Box, Button } from "@mui/material";
import { MouseEventHandler } from "react";
import { buttonStyle } from "../theme/styles";
import ofertas from "../assets/ofertas.svg";

interface Props {
    clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const iconStyle = {
    position: 'fixed',
    top: '84px',
    right: {xs:'10px', md:'30px'},
    width: {xs:'100px', md:'200px'},
    borderRadius: '10px',
    paddingBottom: '0.8rem',
    '&, &:link, &.visited': {
        background: 'radial-gradient(circle at 30% 107%, rgba(253,244,151,0.6) 0%, rgba(253,244,151,0.6) 5%, rgba(253,89,73,0.6) 45%,rgba(214,36,159,0.6) 60%,rgba(40,90,235,0.6) 90%)',
        boxShadow: '0px 3px 10px rgba(0,0,0,.25)',
        transition: 'all .2s'
    },
    '&:hover': {
        transform: 'translateY(-5px)'
    },
    '&:active, &:focus': {
        transform: 'translateY(-2px)'
    }
}

export default function NewsLink({clickHandler}: Props){
    return(
        <Button
            aria-label="News Link" 
            onClick={clickHandler}
            sx={iconStyle}>
            <Box
                component="img"
                sx={{width: {xs:'100px', md:'200px'}}}
                src={ofertas} 
                alt="Flor massagem ofertas"
                />
        </Button>
    )
}