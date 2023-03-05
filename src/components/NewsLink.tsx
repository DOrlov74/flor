import { Box, Button } from "@mui/material";
import { MouseEventHandler } from "react";
import { buttonStyle } from "../theme/styles";
import ofertas from "../assets/verao2023.png";

interface Props {
    clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const iconStyle = {
    position: 'fixed',
    top: '84px',
    right: {xs:'15px', md:'40px'},
    width: {xs:'125px', md:'250px'},
    padding: 0,
    '&, &:link, &.visited': {
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
            aria-label="Sales Link" 
            onClick={clickHandler}
            sx={iconStyle}>
            <Box
                component="img"
                sx={{width: {xs:'125px', md:'250px'}}}
                src={ofertas} 
                alt="Flor massagem ofertas"
                />
        </Button>
    )
}