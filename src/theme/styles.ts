import image from "../assets/wood_opt.jpg";
import { florPrimary, florSecondary } from "./colors";

export const containerStyle = {
    background: `url(${image})`,
    backgroundSize: 'cover',
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 128px)',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
} as const;

export const buttonStyle = {
    '&, &:link, &.visited': {
        backgroundColor: florPrimary[50],
        textTransform: 'none',
    },
    '&:hover': {
        backgroundColor: florSecondary[50],
    },
    '&:active, &:focus': {

    }
} as const;

export const formStyle = {
    maxWidth: "sm",
    margin: '0 auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: `10px 10px 5px ${florPrimary[700]}`,
} as const;