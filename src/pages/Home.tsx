import { Box } from "@mui/material";
import React from "react";
import image from "../assets/background3.jpg";
import Promo from "../components/Promo";

const containerStyle = {
    background: `url(${image})`,
    backgroundSize: 'cover',
    position: 'relative',
    width: '100%',
    minHeight: 'calc(100vh - 128px)',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: 'white',
    
} as const;

export default function Home() {
    return(
        <Box 
            component="div"
            sx={containerStyle}>
            <Promo/>
        </Box>
    )
}