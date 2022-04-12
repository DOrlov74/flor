import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from 'yup';
import { signup } from "../firebase/auth";
import { MessageContext } from "./MessageProvider";
import "yup-phone";
import { LangContext } from "./LanguageProvider";

interface Props{
    open: boolean,
    handleClose: ()=>void
}

export default function SigninDialog({open, handleClose}:Props){
    const {language}=useContext(LangContext);
    const appMessageCtx=useContext(MessageContext);
    const[showPassword, setShowPassword] = useState(false);
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
    const formik = useFormik({
        initialValues: {
            username: '',
            phone: '', 
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            console.log(values);
            const {username, phone, email, password} = values;
            signup(username, phone, email, password, appMessageCtx)
            .then(result => {
                if (result){
                    handleClose();
                } 
            }); 
        },
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return(
        
    <Dialog open={open} onClose={handleClose}>
        <Box
            maxWidth="sm"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            >
            <DialogTitle>Signin</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {language ? 'Para registrar-se no site, preencha o seu nome, o telemóvel, o endereço e-mail e a senha aqui.' : 
                    'To signin to this website, please enter your name, phone, email address and password here.'}
            </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
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
                        margin="normal"
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
                        margin="normal"
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
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>{language ? 'Cancelar' : 'Cancel'}</Button>
            <Button type="submit">{language ? 'Enviar' : 'Submit'}</Button>
            </DialogActions>
        </Box>
    </Dialog>
    )
}