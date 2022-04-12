import { Box } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { SxProps} from '@mui/system';
import { Theme } from '@mui/material/styles';
import React from "react";
import logo from "../assets/logo.svg";

interface Props {
//   children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    img: {
        height: 50
    }
});

export default function Logo({sx=[]}: Props) {
    const classes = useStyles();
    return(
        <Box component="div" className={classes.root} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
            <img className={classes.img} src={logo} alt="Company logo"/>
        </Box>       
    );
}