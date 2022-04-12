import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import image from "../assets/wood_opt.jpg";
import { resetPassword } from "../firebase/auth";
import { florPrimary, florSecondary } from "../theme/colors";
import { MessageContext } from "./MessageProvider";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { LangContext } from "./LanguageProvider";

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
} as const;

const formStyle = {
    //minHeight: '50vh',
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
});

export default function ResetPassForm() {
    const {language}=useContext(LangContext);
    const user=useContext(UserContext);
    const appMessageCtx=useContext(MessageContext);
    let navigate = useNavigate();
    useEffect(()=>{
        if (user) {
            navigate("/book");
        }
    }, [user])
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const {email} = values;
            resetPassword(email, appMessageCtx)
            .then(result => {
                if (result){
                    navigate(`/login`);
                } 
            });
        },
    });
    return (
        <Box component="div"
            sx={containerStyle}>
            <Box
                maxWidth="sm"
                component="form"
                sx={formStyle}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                >
                <Typography gutterBottom variant="h5" sx={{pb: 2}}>
                    {language ? 'Redefenir a senha' : 'Reset Password'}
                </Typography>
                <Typography variant="body1" sx={{textAlign: 'center'}}>
                    {language ? 
                        'Para receber o e-mail de redefenição de senha, preencha o seu endereço e-mail aqui.' : 
                        'To receive password reset email, please enter your email address here.'}
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
                <Button sx={buttonStyle} size="large" type="submit">
                    {language ? 'Enviar' : 'Submit'}
                </Button>
            </Box>
        </Box>
    );
}