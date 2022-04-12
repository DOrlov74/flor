import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { florPrimary, florSecondary } from "../theme/colors";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { logIn } from "../firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserContext } from "./UserProvider";
import { containerStyle, formStyle } from "../theme/styles";
import { LangContext } from "./LanguageProvider";

const buttonStyle = {
        '&, &:link, &.visited': {
            backgroundColor: florPrimary[50],
            textTransform: 'none',
            mt: '1rem'
        },
        '&:hover': {
            backgroundColor: florSecondary[50],
        },
        '&:active, &:focus': {

        }
} as const;

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export default function LoginForm() {
    const {language}=useContext(LangContext);
    const {id} = useParams<{id: string}>();
    const userCtx=useContext(UserContext);
    const user = userCtx!.user;
    let navigate = useNavigate();
    const appMessageCtx=useContext(MessageContext);
    const[showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const {email, password} = values;
            logIn(email, password, appMessageCtx)
            .then(result => {
                if (result){
                    id ? navigate(`/book/${id}`) : navigate("/book");
                } 
            });
        },
    });

    useEffect(()=>{
        if (user) {
            id ? navigate(`/book/${id}`) : navigate("/book");
        }
    }, [user])

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return(
        <Box 
            sx={containerStyle}>
            <Box
                maxWidth="sm"
                component="form"
                sx={formStyle}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                >
                <Typography variant="h5" >
                    Login
                </Typography>
                <Typography variant="body1" sx={{textAlign: 'center'}}>
                    {language ? 
                        'Para continuar com a sua marcação, preencha o seu endereço email e a senha aqui.':
                        'To continue with your booking, please enter your email address and password here.'}
                <br/>
                    {language ? 'Ou, se você não tem conta, ' : 'Or, if you have no account, '} 
                    <Link to="/signin">
                        <b>Signin</b>
                    </Link> {language ? 'em vez disso.' : 'instead.'}
                </Typography>
                <TextField
                    autoFocus
                    fullWidth
                    variant="standard"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    variant="standard"
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{ 
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}
                />
                <Typography variant="body2" sx={{textAlign: 'center'}}>
                    {language ? 'Esqueceu a senha?' : 'Forgot your password?'}
                <br/>
                    {language ? 'Pode, ' : 'You can,'}
                         <Link to="/reset">
                             <b>{language ? 'Redefinir' : 'Reset'}</b> 
                             {language ? ' a senha aqui' : ' your password here.'}
                        </Link>
                </Typography>
                <Button sx={buttonStyle} size="large" type="submit">
                    {language ? 'Enviar' : 'Submit'}
                </Button>
            </Box>
        </Box>
    );
}