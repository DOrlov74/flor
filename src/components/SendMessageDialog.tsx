import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';
import { sendNotification } from '../telegram/api';
import { LangContext } from './LanguageProvider';
import { MessageContext } from './MessageProvider';

interface Props{
    open: boolean,
    handleClose: ()=>void
}

export default function SendMessageDialog({open, handleClose}:Props) {
    const {language}=useContext(LangContext);
    const appMessageCtx=useContext(MessageContext);
    const validationSchema = yup.object({
        username: yup
            .string()
            .min(3, 'Name should be of minimum 3 characters length')
            .required('Your name is required'),
        phone: yup
            .string()
            .phone('pt')
            .required('Your phone is required'),
        message: yup
            .string()
            .min(8, 'Message should be of minimum 8 characters length')
            .required('Your message is required'),
    });
    const formik = useFormik({
        initialValues: {
            username: '',
            phone: '', 
            message: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const {username, phone, message} = values;
            const packet = `name: ${username}, phone: ${phone}, message: ${message}`;
            sendNotification(packet, appMessageCtx);
            handleClose();
        },
    });


    return(
        <Dialog open={open} onClose={handleClose}>
        <Box
            maxWidth="sm"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            >
            <DialogTitle>{language ? 'Enviar uma mensagem' : 'Send us a message'}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {language ? 'Para enviar a mensagem, preencha o seu nome, o telemóvel e a mensagem aqui.' : 
                    'To submit a message, please enter your name, phone and a message here.'}
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
                        multiline
                        variant="standard"
                        id="message"
                        name="message"
                        label="Message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                    />              
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{language ? 'Cancelar' : 'Cancel'}</Button>
                <Button type="submit">{language ? 'Enviar' : 'Submit'}</Button>
            </DialogActions>
        </Box>
    </Dialog>
    );
}