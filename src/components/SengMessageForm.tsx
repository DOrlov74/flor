import { ChangeEvent, useContext, useState } from "react";
import { LangContext } from "./LanguageProvider";
import { MessageContext } from "./MessageProvider";
import * as yup from 'yup';
import { useFormik } from "formik";
import { addDays, format } from "date-fns";
import { sendNotification } from "../telegram/api";
import { Box, Button, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { buttonStyle, containerStyle, formStyle } from "../theme/styles";
import DoneIcon from '@mui/icons-material/Done';
import Footer from "./Footer";
import { CalendarPickerSkeleton, DatePicker } from "@mui/lab";
import { hours } from "../content/hours";
import { florSecondary } from "../theme/colors";
import { UserContext } from "./UserProvider";

export default function SendMessageForm(){
    const userCtx=useContext(UserContext);
    const user = userCtx?.user;
    const {language}=useContext(LangContext);
    const appMessageCtx=useContext(MessageContext);
    const [name, setName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [value, setValue] = useState<Date | null>(null);
    const [displayDate, setDisplayDate] = useState('');
    const [hour, setHour] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [created, setCreated] = useState(false);
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
            username: user? user.displayName: name,
            phone: user? user.phone: userPhone, 
            bookdate: value,
            booktime: hour,
            message: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const {username, phone, booktime, message} = values;
            const packet = `name: ${username}, phone: ${phone}, date: ${displayDate}, hour: ${booktime}, message: ${message}`;
            sendNotification(packet, appMessageCtx);
            setCreated(true);
        },
    });

    const handleNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const n = event.target.value as string;
        setName(n);
    };

    const handlePhoneChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const p = event.target.value as string;
        setUserPhone(p);
    };

    const handleHourChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const h = event.target.value as string;
        setHour(h);
    };

    const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const m = event.target.value as string;
        setUserMessage(m);
    };

    return(
        <>
        <Box 
            sx={containerStyle}>
            {created && <Box sx={formStyle}>
                <Typography variant="h5" >
                    {language?'A sua mensagem foi enviada com sucesso':'Your message was sent successfully'}
                </Typography>
                <DoneIcon color='success'/>
                <Table padding="none">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}><Typography gutterBottom variant="h6" component="div">
                                {language ? 'Enviar a mensagem' : 'Send a message'}
                            </Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {language ? 'Nome:' : 'Name:'} 
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {name}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {language ? 'Telemóvel' : 'Phone:'} 
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {userPhone}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {language ? 'Data:' : 'Date:'} 
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {displayDate}&ensp;{hour}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {language ? 'Mensagem:' : 'Message:'} 
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {userMessage}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>}
            {!created && <>
                <Box
                maxWidth="sm"
                component="form"
                sx={formStyle}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                >
                <Typography variant="h5" >
                    {language ? 'Enviar a mensagem' : 'Send a message'}
                </Typography>
                <Typography variant="body1" sx={{textAlign: 'center'}}>
                    {language ? 'Para enviar a mensagem, preencha o seu nome, o telemóvel, o dia e hora preferivel para um tratamento, e a sua mensagem aqui.' : 
                    'To submit a message, please enter your name, phone, date and hour preferable for a treatment, and your message here.'}
                </Typography>
                <TextField
                        autoFocus
                        margin="normal"
                        fullWidth
                        variant="standard"
                        id="username"
                        name="username"
                        label="Name"
                        value={formik.values.username}
                        onChange={(e)=>{
                            formik.handleChange(e);
                            handleNameChange(e);}}
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
                        onChange={(e)=>{
                            formik.handleChange(e);
                            handlePhoneChange(e);}}
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
                                    setDisplayDate(format(newValue, 'dd/MM/yyyy'));
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
                        onChange={(e)=>{
                            formik.handleChange(e);
                            handleMessageChange(e);}}
                        onBlur={formik.handleBlur}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                    /> 
                    <Typography variant="body1" color={florSecondary[900]}>
                        {language ? '* - a massagem fica marcada depois da confirmação':
                        '* - a massage gets scheduled after the confirmation'}
                    </Typography>             
                    <Button sx={buttonStyle} size="large" type="submit">
                        {language ? 'Enviar' : 'Submit'}
                    </Button>
                </Box>
            </>}
        </Box>
        <Footer/>
        </>
    )
}