import InstagramIcon from '@mui/icons-material/Instagram';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
    pos?: number;
}

const iconStyle = {
    position: 'fixed',
    bottom: {xs:'52px', md:'84px'},
    right: '30px',
    zIndex: '1200',
    '&, &:link, &.visited': {
        color: 'white',
        transition: 'all .2s'
    },
    '&:hover': {
        transform: 'translateY(-5px)'
    },
    '&:active, &:focus': {
        transform: 'translateY(-2px)'
    }
}

const disabled = {
    display: 'none'
}

const instagram = {
    fontSize: {xs:'1.5rem', md: '2.5rem'},
    background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
    boxShadow: '0px 3px 10px rgba(0,0,0,.25)'
}

export default function InstaLink({pos}: Props){
    const [disState, setdisState] = useState(true);
    
    useEffect(()=>{
        pos!=undefined && (pos > 64 &&
        (window.innerHeight + pos) < document.body.scrollHeight)
         ? setdisState(false) : setdisState(true);
    }, [pos])

    return(
        <IconButton 
            aria-label="Instagram Link" 
            href='https://www.instagram.com/vi_flormassagem/' 
            sx={disState?iconStyle:disabled}>
            <InstagramIcon sx={instagram}/>
        </IconButton>
    )
}