import { createTheme } from "@mui/material/styles";
import { florPrimary } from "./colors";

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: florPrimary[700],
        },
        secondary: {
            main: '#e4711e',
        },
        background: {
            default: '#f7edda',
        },
    },
    typography: {
        fontFamily: 'Cairo',
    },
})

export default theme;