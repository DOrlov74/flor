import { ChangeEvent, useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { florPrimary, florSecondary } from "../theme/colors";
import { LangContext } from './LanguageProvider';
import { MessageContext } from './MessageProvider';
import { UserContext } from './UserProvider';
import { logIn, logout, signup } from '../firebase/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addresses } from '../content/addresses';
import { Vacancy } from '../models/Vacancy';
import { Booking } from '../models/Booking';
import { createBookingDoc, createVacancyDoc, getVacancies, getVacancyByDate } from '../firebase/documents';
import { services } from '../content/services';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, IconButton, InputAdornment, MenuItem, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { addDays, addHours, format, isAfter, isBefore, parse } from 'date-fns';
import { cardStyle, containerStyle, formStyle } from '../theme/styles';
import Footer from './Footer';
import { Login, Visibility, VisibilityOff } from '@mui/icons-material';
import { CalendarPickerSkeleton, DatePicker } from '@mui/lab';
import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppUser } from '../models/User';

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

const signinValidationSchema = yup.object({
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

const bookValidationSchema = yup.object({
service: yup
    .string()
    .required('Service is required'),
address: yup
    .string()
    .required('Address is required'),
bookdate: yup
    .string()
    .nullable()
    // .required('Date is required')
    ,
booktime: yup
    .string()
    .required('Time is required'),
});

export default function SigninAndBookForm() {
    const {language}=useContext(LangContext);
    const {id} = useParams<{id: string}>();
    const userCtx=useContext(UserContext);
    const {user,setUpdated} = userCtx!;
    const appMessageCtx=useContext(MessageContext);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState<Date | null>(null);
    const [service, setService] = useState('');
    const [addressList, setAddressList] = useState(addresses);
    const [address, setAddress] = useState(addresses[0].address);
    const [hour, setHour] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [created, setCreated] = useState(false);
    const [failed, setFailed] = useState(false);
    const [vacancy, setVacancy] = useState<Vacancy|null>(null);
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [activeBooking, setActiveBooking] = useState<Booking>({
        id: `${Date.now()}`,
        user: user,
        address: addresses[0].address,
        service: '',
        date: '',
        hour: ''
    });
    const [expanded, setExpanded] = useState<string>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent) => {
        setExpanded(expanded === 'panel1' || user !== null ? 'panel2' : 'panel1' );
        };

    const signinFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: username,
            phone: phone,
            email: email,
            password: password,
        },
        validationSchema: signinValidationSchema,
        onSubmit: (values) => {
            setLoading(true);
            const {username, phone, email, password} = values;
            signup(username, phone, email, password, appMessageCtx)
            .then(result => {
                if (result){
                    setSubmitted(true);
                    setUpdated(true);
                } 
            }).catch((e)=>{
                setFailed(true);
            });
            setLoading(false);
        },
    });

    const bookFormik = useFormik({
        initialValues: {
            service: service,
            address: address,
            bookdate: value,
            booktime: hour
        },
        validationSchema: bookValidationSchema,
        onSubmit: (values) => {
            setLoading(true);
            if (activeBooking.user && value !== null){
                updateVacancy(hour);
                createBookingDoc(activeBooking, appMessageCtx).then((result) => {
                    if (result) {
                        setCreated(true);
                        setUpdated(true);
                    }
                }).catch((e)=>{
                    console.log(e);
                    setFailed(true);
                });
            }
            setLoading(false);
        },
    });

    useEffect(()=>{
        if (user){
            setExpanded('panel2');
            if (user.displayName && user.email && user.phone){
                setActiveBooking({
                    ...activeBooking,
                    user: {...user}
                });
            } else {
                setActiveBooking({
                    ...activeBooking,
                    user: {...user, displayName: username, phone: phone, email: email}
                });
            }
        }
    },[user]);

    useEffect(() => {
            getVacancies(appMessageCtx).then(v => {
            if (v) setVacancies(v);
        })
    }, []);

    useEffect(()=>{
        if (id) {
            const serv = services.find(s => (s.id === id));
            if (serv) {
                setService(serv.name);
                setActiveBooking({
                    ...activeBooking,
                    service: serv.name});
                const adrs = addresses.filter(a => serv.prices.some(p => p.address === a.name));
                setAddressList(adrs);
            }
        }
    }, [id]);

    const handleUsernameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const usrName = event.target.value as string;
            setUsername(usrName);
        if (activeBooking.user){
            setActiveBooking({
                ...activeBooking,
                user: {...activeBooking.user, displayName: usrName}
            });
        }
    };

    const handlePhoneChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const usrPhone = event.target.value as string;
        setPhone(usrPhone);
        if (activeBooking.user){
            setActiveBooking({
                ...activeBooking,
                user: {...activeBooking.user, phone: usrPhone}
            });
        }
    };

    const handleEmailChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const usrEmail = event.target.value as string;
        setEmail(usrEmail);
        if (activeBooking.user){
            setActiveBooking({
                ...activeBooking,
                user: {...activeBooking.user, email: usrEmail}
            });
        }
    };

    const handlePassChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const usrPassword = event.target.value as string;
        setPassword(usrPassword);
    };

    const handleServiceChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const servName = event.target.value as string;
        setService(servName);
        setActiveBooking({
            ...activeBooking,
            service: servName});
        const serv = services.find(s => (s.name === servName));
        if (serv) {
            const adrs = addresses.filter(a => serv.prices.some(p => p.address === a.name));
            setAddressList(adrs);
        }
    };

    const handleAddressChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const address = event.target.value as string;
        setAddress(address);
        setActiveBooking({
            ...activeBooking,
            address: address});
    };

    const handleHourChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const h = event.target.value as string;
        setHour(h);
        setActiveBooking({
            ...activeBooking,
            hour: h});
    };

    const updateVacancy = (hour: string) => {
        const h = parse(hour, 'HH:mm', new Date());
        if (vacancy) {
            const newVacancy = {
                ...vacancy, 
                hours: [...vacancy.hours.filter(v => 
                    (isBefore(parse(v, 'HH:mm', new Date()), addHours(h, -2)) ||
                    isAfter(parse(v, 'HH:mm', new Date()), addHours(h, 2)))
            )]}
            createVacancyDoc(newVacancy, appMessageCtx);
            setVacancy(newVacancy);
        }
    };

    function getHours(date:string){
        setLoading(true);
        getVacancyByDate(date, appMessageCtx).then((v) => {
            if (v) setVacancy(v);
            else setVacancy(null);
            setLoading(false);
        });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return(
        <>
        <Box 
            sx={containerStyle}>
            {created && <Box sx={formStyle}>
                <Typography variant="h5" >
                    {language?'A sua marcação foi concluída com sucesso':'Your booking was completed successfully'}
                </Typography>
                <DoneIcon color='success'/>
                <Table padding="none">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}><Typography gutterBottom variant="h6" component="div">
                                {language ? 'Marcação' : 'Booking'}
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
                                    {username}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    Email: 
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {email}
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
                                    {phone}
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
                                    {activeBooking.date}&ensp;{activeBooking.hour}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {language ? 'Serviço:' : 'Service:'} 
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {activeBooking.service}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {language ? 'Endereço:' : 'Address:'} 
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" component="div">
                                    {activeBooking.address}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button sx={buttonStyle} size="large" component={Link} to='/bookings'>
                    {language ? 'Gerir as suas marcações' : 'Manage your bookings'}
                </Button>
            </Box>}
            {!created && <>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                        <Typography variant="h5" sx={{ width: '50%', flexShrink: 0 }}>
                            Signin {language?'com email':'with email'}
                        </Typography>
                        {!user && <Typography sx={{ color: 'text.secondary' }}>{language?'preencha a sua informação, por favor':'Fill in you  information, please'}</Typography>}
                    </AccordionSummary>
                    <AccordionDetails sx={formStyle}>
                        <Box
                            maxWidth={{xs:"330px", md:"580px"}}
                            component="form"
                            noValidate
                            autoComplete="off"
                            onSubmit={signinFormik.handleSubmit}
                            >
                            <TextField
                                autoFocus
                                fullWidth
                                variant="standard"
                                id="username"
                                name="username"
                                label="Name"
                                value={signinFormik.values.username}
                                onChange={(e)=>{
                                    signinFormik.handleChange(e);
                                    handleUsernameChange(e);
                                }}
                                onBlur={signinFormik.handleBlur}
                                error={signinFormik.touched.username && Boolean(signinFormik.errors.username)}
                                helperText={signinFormik.touched.username && signinFormik.errors.username}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                variant="standard"
                                id="phone"
                                name="phone"
                                label="Phone"
                                value={signinFormik.values.phone}
                                onChange={(e)=>{
                                    signinFormik.handleChange(e);
                                    handlePhoneChange(e);
                                }}
                                onBlur={signinFormik.handleBlur}
                                error={signinFormik.touched.phone && Boolean(signinFormik.errors.phone)}
                                helperText={signinFormik.touched.phone && signinFormik.errors.phone}
                            />
                            <TextField
                                fullWidth
                                variant="standard"
                                id="email"
                                name="email"
                                label="Email"
                                value={signinFormik.values.email}
                                onChange={(e)=>{
                                    signinFormik.handleChange(e);
                                    handleEmailChange(e);
                                }}
                                onBlur={signinFormik.handleBlur}
                                error={signinFormik.touched.email && Boolean(signinFormik.errors.email)}
                                helperText={signinFormik.touched.email && signinFormik.errors.email}
                            />
                            <TextField
                                fullWidth
                                variant="standard"
                                id="password"
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={signinFormik.values.password}
                                onChange={(e)=>{
                                    signinFormik.handleChange(e);
                                    handlePassChange(e);
                                }}
                                onBlur={signinFormik.handleBlur}
                                error={signinFormik.touched.password && Boolean(signinFormik.errors.password)}
                                helperText={signinFormik.touched.password && signinFormik.errors.password}
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
                            <Button sx={buttonStyle} size="large" type="submit" disabled={loading || user!==null}>
                                {language ? 'Enviar' : 'Submit'}
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                        >
                        <Typography variant="h5" sx={{ width: '50%', flexShrink: 0 }}>
                            {language?'Marcar':'Book'}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {language ? 'Marcar a massagem aqui' : 'Book your massage here'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={formStyle}>
                    <Box
                    maxWidth={{xs:"330px", md:"580px"}}
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={bookFormik.handleSubmit}
                    >
                    <TextField
                        fullWidth
                        variant="standard"
                        id="service"
                        name="service"
                        label="Select service"
                        select
                        value={bookFormik.values.service}
                        onChange={(e)=>{
                            bookFormik.handleChange(e);
                            handleServiceChange(e);
                        }}
                        onBlur={bookFormik.handleBlur}
                        error={bookFormik.touched.service && Boolean(bookFormik.errors.service)}
                        helperText={bookFormik.touched.service && bookFormik.errors.service}
                    >
                        <MenuItem value=''></MenuItem>
                        {services.map((serv)=>(
                                <MenuItem key={serv.id} value={serv.name}>{serv.name}</MenuItem>
                            ))}
                    </TextField>
                    <TextField
                        fullWidth
                        variant="standard"
                        id="address"
                        name="address"
                        label="Select address"
                        select
                        value={bookFormik.values.address}
                        onChange={(e)=>{
                            bookFormik.handleChange(e);
                            handleAddressChange(e);
                        }}
                        onBlur={bookFormik.handleBlur}
                        error={bookFormik.touched.address && Boolean(bookFormik.errors.address)}
                        helperText={bookFormik.touched.address && bookFormik.errors.address}
                    >
                        <MenuItem value=''></MenuItem>
                        {addressList.map((address)=>(
                                <MenuItem key={address.name} value={address.address}>{address.address}</MenuItem>
                            ))}
                    </TextField>
                    <DatePicker
                            minDate={addDays(new Date(), 1)}
                            label="Select a date"
                            value={value}
                            loading={loading}
                            allowSameDateSelection={true}
                            inputFormat={'dd/MM/yyyy'}
                            onChange={(newValue) => {
                                if (newValue){
                                    const d = format(newValue, 'dd/MM/yyyy');
                                    setValue(newValue);
                                    setActiveBooking({
                                        ...activeBooking,
                                        date: d});
                                    getHours(d);
                                }
                            }}
                            shouldDisableDate={(date => {
                                if (vacancies.some(v => v.date === format(date, 'dd/MM/yyyy'))) {
                                    return false;
                                } else {
                                    return true;
                                }
                            })}
                            renderInput={(params) => 
                                <TextField 
                                    fullWidth
                                    variant="standard"
                                    id="bookdate" 
                                    name="bookdate" 
                                    value={bookFormik.values.bookdate}
                                    required={value===null}
                                    onChange={bookFormik.handleChange}
                                    onBlur={bookFormik.handleBlur}
                                    error={bookFormik.touched.bookdate && Boolean(bookFormik.errors.bookdate)}
                                    helperText={bookFormik.touched.bookdate && bookFormik.errors.bookdate}
                                    {...params } />}
                            renderLoading={() => <CalendarPickerSkeleton />}
                        /> 
                    <TextField
                        fullWidth
                        variant="standard"
                        id="booktime"
                        name="booktime"
                        label="Select time"
                        select
                        value={bookFormik.values.booktime}
                        onChange={(e)=>{
                            bookFormik.handleChange(e);
                            handleHourChange(e);
                        }}
                        onBlur={bookFormik.handleBlur}
                        error={bookFormik.touched.booktime && Boolean(bookFormik.errors.booktime)}
                        helperText={bookFormik.touched.booktime && bookFormik.errors.booktime}
                    >
                        <MenuItem value=''></MenuItem>
                        {vacancy?.hours.map((hour)=>(
                                <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                                ))}
                    </TextField>
                    {loading ? <CircularProgress/> :
                        failed ? <Typography sx={{ mt: 2, mb: 1 }}>
                            {language ? 
                                'Desculpe, houve um erro ao criar a sua marcação. Por favor, tente novamente mais tarde.' : 
                                'Sorry, there is an error with creating your appointment. Please, try again later.'}
                        </Typography>:
                        <Typography variant='body2' sx={{minHeight: '40px'}}>
                            {language ? 
                                'Se não haver a data/hora precisa, entre em contacto conosco, por favor.' : 
                                'If there is no necessary date/hour, contact us, please.'}
                        </Typography>}
                    <Stack direction="row" spacing={5} sx={{alignItems: 'center'}}>
                    {failed ? <Button sx={buttonStyle} size="large" component={Link} to="/">
                            {language ? 'Ir para a pagina Inicial' : 'Go to Home Page'}
                        </Button> :
                        <Button sx={buttonStyle} size="large" type="submit" disabled={loading || !user}>
                            {language ? 'Enviar' : 'Submit'}
                        </Button>}
                    {!user && 
                        <Typography sx={{ color: florSecondary[900] }}>
                            {language ? 'Antes de marcar faça signin primeiro, por favor' : 'Before the booking signin first, please'}
                        </Typography>
                    }
                    </Stack>
                </Box>
                </AccordionDetails>
            </Accordion>
            </>}
        </Box>
        <Footer/>
        </>
    )
}