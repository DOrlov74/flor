import { CalendarPickerSkeleton, DatePicker } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { ChangeEvent, useContext, useState } from 'react';
import * as yup from 'yup';
import { addDays, format } from 'date-fns';
import { sendNotification } from '../telegram/api';
import { LangContext } from './LanguageProvider';
import { MessageContext } from './MessageProvider';
import { hours } from '../content/hours';
import { florSecondary } from '../theme/colors';

interface Props{
    open: boolean,
    handleClose: ()=>void
}

export default function SendMessageDialog({open, handleClose}:Props) {
    const {language}=useContext(LangContext);
    const appMessageCtx=useContext(MessageContext);
    const [value, setValue] = useState<Date | null>(null);
    const [hour, setHour] = useState('');
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
        bookdate: yup
            .string()
            .nullable(),
        booktime: yup
            .string(),
    });
    const formik = useFormik({
        initialValues: {
            username: '',
            phone: '', 
            bookdate: value,
            booktime: hour,
            message: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const {username, phone, bookdate, booktime, message} = values;
            let d='';
            if(bookdate != null){d = format(bookdate, 'dd/MM/yyyy');}
            const packet = `name: ${username}, phone: ${phone}, date: ${d}, hour: ${booktime}, message: ${message}`;
            sendNotification(packet, appMessageCtx);
            handleClose();
        },
    });

    const handleHourChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const h = event.target.value as string;
        setHour(h);
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
            <DialogTitle>{language ? 'Enviar uma mensagem' : 'Send us a message'}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {language ? 'Para enviar a mensagem, preencha o seu nome, o telemóvel, o dia e hora preferivel para um tratamento, e a sua mensagem aqui.' : 
                    'To submit a message, please enter your name, phone, date and hour preferable for a treatment, and your message here.'}
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
                    <DatePicker
                            minDate={addDays(new Date(), 1)}
                            label="Select a preferable date"
                            value={value}
                            allowSameDateSelection={true}
                            inputFormat={'dd/MM/yyyy'}
                            onChange={(newValue) => {
                                if (newValue){
                                    setValue(newValue);
                                }
                            }}
                            renderInput={(params) => 
                                <TextField 
                                    fullWidth
                                    variant="standard"
                                    id="bookdate" 
                                    name="bookdate" 
                                    value={formik.values.bookdate}
                                    required={value===null}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.bookdate && Boolean(formik.errors.bookdate)}
                                    helperText={formik.touched.bookdate && formik.errors.bookdate}
                                    {...params } />}
                            renderLoading={() => <CalendarPickerSkeleton />}
                        /> 
                    <TextField
                        fullWidth
                        variant="standard"
                        id="booktime"
                        name="booktime"
                        label="Select preferable time"
                        select
                        value={formik.values.booktime}
                        onChange={(e)=>{
                            formik.handleChange(e);
                            handleHourChange(e);
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.touched.booktime && Boolean(formik.errors.booktime)}
                        helperText={formik.touched.booktime && formik.errors.booktime}
                    >
                        <MenuItem value=''></MenuItem>
                        {hours.map((hour)=>(
                                <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                                ))}
                    </TextField>
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
                <Typography variant="body1" color={florSecondary[900]}>
                {language ? '* - a massagem fica marcada depois da confirmação':
                '* - a massage gets scheduled after the confirmation'}
                </Typography>             
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{language ? 'Cancelar' : 'Cancel'}</Button>
                <Button type="submit">{language ? 'Enviar' : 'Submit'}</Button>
            </DialogActions>
        </Box>
    </Dialog>
    );
}