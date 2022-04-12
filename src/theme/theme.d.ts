import {Theme, ThemeOptions} from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    palette: {
        type: string;
        primary: {
          main: string;
        },
        secondary: {
          main: string;
        },
        background: {
          default: string;
        },
    };
    typography: {
        fontFamily: string;
    };
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    palette?: {
        type?: string;
        primary?: {
        main?: string;
        },
        secondary?: {
        main?: string;
        },
        background?: {
        default?: string;
        },
    };
    typography?: {
        fontFamily?: string;
    };
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}