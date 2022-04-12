import styled from "@emotion/styled"
import Box, { BoxProps } from "@mui/material/Box"

export const StyledBox = styled(Box)<BoxProps>`
    height: 90vh,
    margin: 0 auto,
    display: flex,
    flex-direction: column,
    align-items: center,
    justify-content: space-evenly,
    &::before: {
            content: '';
            position: absolute;
            top: -50%;
            right: 50%;
            bottom: 50%;
            left: -50%;
            background: rgba(255,0,0,.5);   //for debugging
            //background: 'url('../img/background.jpg') 0 / cover';
            filter: blur(20px);
            margin: -30px;
            z-index: -1;
        }
`

