import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Typography } from "@mui/material";
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
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { logIn } from "../firebase/auth";
import { LangContext } from "./LanguageProvider";
import { MessageContext } from "./MessageProvider";

interface Props{
    open: boolean,
    handleClose: ()=>void
}

export default function LoginDialog({open, handleClose}:Props){
    const {language}=useContext(LangContext);
    const appMessageCtx=useContext(MessageContext);
    const[showPassword, setShowPassword] = useState(false);
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
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            console.log(values);
            const {email, password} = values;
            logIn(email, password, appMessageCtx)
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
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {language ? 
                        'Para entrar neste site, preencha o seu endereço email e a senha aqui:' : 
                        'To login to this website, please enter your email address and password here.'}
                </DialogContentText>
                    <TextField
                        autoFocus
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
                    <Typography variant="body2" sx={{textAlign: 'center'}}>
                        {language ? 'Esqueceu a senha?' : 'Forgot your password?'}
                    <br/>
                        {language ? 'Pode, ' : 'You can,'}
                         <Link to="/reset">
                             <b>{language ? 'Redefinir' : 'Reset'}</b> 
                             {language ? ' a senha aqui' : ' your password here.'}
                        </Link>
                </Typography>             
                </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>{language ? 'Cancelar' : 'Cancel'}</Button>
            <Button type="submit">{language ? 'Enviar' : 'Submit'}</Button>
            </DialogActions>
        </Box>
    </Dialog>
    )
}