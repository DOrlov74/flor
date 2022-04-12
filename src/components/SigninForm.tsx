import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import { signup } from "../firebase/auth";
import { florPrimary, florSecondary } from "../theme/colors";
import { containerStyle, formStyle } from "../theme/styles";
import { LangContext } from "./LanguageProvider";
import { MessageContext } from "./MessageProvider";
import { UserContext } from "./UserProvider";

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
    username: yup
        .string()
        .min(3, 'Name should be of minimum 3 characters length')
        .required('Your name is required'),
    phone: yup
            .string()
            .phone('pt')
            .required('Your phone is required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export default function SigninForm() {
    const {language}=useContext(LangContext);
    const {id} = useParams<{id: string}>();
    const userCtx=useContext(UserContext);
    const user = userCtx!.user;
    let navigate = useNavigate();
    const appMessageCtx=useContext(MessageContext);
    const[showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: '',
            phone: '',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const {username, phone, email, password} = values;
            signup(username, phone, email, password, appMessageCtx)
            .then(result => {
                if (result){
                    id ? navigate(`/book/${id}`) : navigate("/book");
                } 
            });
        },
    });

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {   
        setIsMounted(true);           
        return () => { setIsMounted(false) }; // cleanup toggles value, if unmounted
    }, []); 

    useEffect(()=>{
        if (isMounted && user) {
            id ? navigate(`/book/${id}`) : navigate("/book");
        }
    }, [isMounted, user])

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
                    Signin
                </Typography>
                <Typography variant="body1" sx={{textAlign: 'center'}}>
                    {language ? 
                        'Para continuar com a sua marcação, por favor preencha o formulário aqui.':
                        'To continue with your booking, please fill in the form here.'}
                <br/>
                    {language ? 'Ou, se você tem uma conta, ' : 'Or, if you have an account, '} 
                    <Link to="/login"><b>Login</b></Link> 
                    {language ? ' em vez disso.' : ' instead.'}
                </Typography>
                <TextField
                    autoFocus
                    fullWidth
                    variant="standard"
                    id="username"
                    name="username"
                    label="Name"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    variant="standard"
                    id="phone"
                    name="phone"
                    label="Phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
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
                    onBlur={formik.handleBlur}
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
                <Button sx={buttonStyle} size="large" type="submit">
                    {language ? 'Enviar' : 'Submit'}
                </Button>
            </Box>
        </Box>
    );
}