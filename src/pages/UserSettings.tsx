import { Avatar, Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../components/UserProvider";
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { updateUserEmail, updateUserName } from "../firebase/auth";
import { MessageContext } from "../components/MessageProvider";
import { updateUserDoc } from "../firebase/documents";
import { buttonStyle, containerStyle, formStyle } from "../theme/styles";
import { LangContext } from "../components/LanguageProvider";

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
});
    
export default function UserSettings() {
    const {language}=useContext(LangContext);
    const userCtx=useContext(UserContext);
    const user = userCtx!.user;
    const updated = userCtx!.updated;
    const setUpdated = userCtx!.setUpdated;
    const appMessageCtx=useContext(MessageContext);
    let navigate = useNavigate();
    const [submited, setSubmited] = useState(false);
    

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: user?.displayName,
            phone: user?.phone,
            email: user?.email,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const {username, phone, email} = values;
            if (user) {
                if (username && (username !== user.displayName)) {
                    updateUserName(user, username, appMessageCtx); 
                }
                if (email && (email !== user.email)) {
                    updateUserEmail(user, email, appMessageCtx); 
                }
                updateUserDoc(user, {username, phone, email}, appMessageCtx)
                .then(result => {
                    setSubmited(true);
                    if (result){
                        setUpdated(true);
                    } 
                });
            };
        },
    });

    return(
        <>
        {user && <Box 
            sx={containerStyle}>
            <Box
                component="form"
                sx={formStyle}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                >
                <Typography gutterBottom variant="h5" component="div">
                    {language ? 'O seu perfil' : 'Your profile'}
                </Typography>
                <Stack direction="row" spacing={1} sx={{width: '100%', alignItems: 'flex-end'}}>
                    <Avatar 
                        sx={{ mx: '1rem', width: 112, height: 112 }}
                        alt={user.displayName ? user.displayName : "unknown"} 
                        src={(user.photoURL) ? user.photoURL : "/static/images/avatar/2.jpg"} />
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
                </Stack>
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
                {submited && (updated ? <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {language ? 'As detalhes do seu perfil foram atualizadas' : 'Your profile information was updated.'}
                    </Typography>
                    <DoneIcon color='success'/>
                    </> : <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {language ? 
                            'Desculpe, ocorreu um erro ao atualizar seu perfil. Por favor, tente novamente mais tarde.' : 
                            'Sorry, there is an error with updating your profile. Please, try again later.'}
                    </Typography>
                    <ErrorOutlineIcon color='error'/>
                    </>)}
                <Stack direction="row" spacing={1} sx={{my: '1rem', width: '100%', justifyContent: 'center'}}>
                    <Button sx={buttonStyle} size="large" onClick={() => navigate(-1)}>{language ? 'Voltar' : 'Back'}</Button>
                    <Button sx={buttonStyle} size="large" type="submit">{language ? 'Guardar' : 'Save'}</Button>
                </Stack>
            </Box>
        </Box>}</>
    );
}