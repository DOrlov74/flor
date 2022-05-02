import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { CalendarPickerSkeleton, DatePicker } from "@mui/lab";
import { useContext, useEffect, useState } from "react";
import { Booking } from "../models/Booking";
import { UserContext } from "../components/UserProvider";
import { services } from "../content/services";
import { Vacancy } from "../models/Vacancy";
import { addDays, addHours, format, isAfter, isBefore, parse } from "date-fns";
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link, useNavigate, useParams } from "react-router-dom";
import { addresses } from "../content/addresses";
import { MessageContext } from "../components/MessageProvider";
import { createBookingDoc, createVacancyDoc, getVacancies, getVacancyByDate } from "../firebase/documents";
import { buttonStyle, containerStyle, formStyle } from "../theme/styles";
import { LangContext } from "../components/LanguageProvider";

export default function Book() {
    const {language}=useContext(LangContext);
    const {id} = useParams<{id: string}>();
    const userCtx=useContext(UserContext);
    const user = userCtx!.user;
    let navigate = useNavigate();
    const appMessageCtx=useContext(MessageContext);
    const [activeStep, setActiveStep] = useState(0);
    const [value, setValue] = useState<Date | null>(null);
    const [service, setService] = useState('');
    const [addressList, setAddressList] = useState(addresses);
    const [address, setAddress] = useState(addresses[0].address);
    const [hour, setHour] = useState('');
    const [next, setNext] = useState(false);
    const [loading, setLoading] = useState(false);
    const [created, setCreated] = useState(false);
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
    const [isMounted, setIsMounted] = useState(false);

    const steps = language ? [
        'Selectione o serviço',
        'Selectione a localização',
        'Selectione a data',
        'Selectione a hora',
        'Verifique e confirme',
    ] : [
        'Select a service',
        'Select an address',
        'Select a date',
        'Select a time',
        'Check and confirm',
    ];

    useEffect(() => {  
        setIsMounted(true);            
        return () => { setIsMounted(false) }; // cleanup toggles value, if unmounted
    }, []); 

    useEffect(()=>{
        if (isMounted && !user) {
            id ? navigate(`/signin/${id}`) : navigate("/signin");
        }
    }, [isMounted, user])

    useEffect(() => {
        if (user){
            getVacancies(appMessageCtx).then(v => {
            if (v) setVacancies(v);
        })}
    }, [user]);

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
                setNext(true);
            }
        }
    }, [id]);

    useEffect(()=>{
        checkStep();
    },[activeStep]);

    const handleNext = () => {
        setNext(false);
        if (activeStep === steps.length - 1) {
            setLoading(true);
            updateVacancy(hour);
            createBookingDoc(activeBooking, appMessageCtx).then((result) => {
                if (result) setCreated(true);
                setLoading(false);
            });
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep === 1){
            setAddress(addresses[0].address);
            setActiveBooking({
                ...activeBooking,
                address: addresses[0].address});
        } else if (activeStep === 2){
            setVacancy(null);
            setActiveBooking({
            ...activeBooking,
            date: ''});
        } else if (activeStep === 3){
            setHour('');
            setActiveBooking({
                ...activeBooking,
                hour: ''});
        }
        setNext(false);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCreated(false);
    };

    const handleServiceChange = (event: SelectChangeEvent) => {
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
        setNext(true);
    };

    const handleAddressChange = (event: SelectChangeEvent) => {
        const address = event.target.value as string;
        setAddress(address);
        setActiveBooking({
            ...activeBooking,
            address: address});
        setNext(true);
    };

    const handleHourChange = (event: SelectChangeEvent) => {
        const h = event.target.value as string;
        setHour(h);
        setActiveBooking({
            ...activeBooking,
            hour: h});
        setNext(true);
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
    
    function checkStep(){
        switch (activeStep){
            case 0:
                if (activeBooking.service !== ''){
                    setNext(true);
                } 
            break;
            case 1:
                if (activeBooking.address !== ''){
                    setNext(true);
                } 
            break;
            case 2:
                if ((activeBooking.date !== '') 
                    && (vacancy !== null 
                        && vacancy!.hours.length !== 0)){
                    setNext(true);
                } 
            break;
            case 3:
                if (activeBooking.hour !== ''){
                    setNext(true);
                }
            break;
            case 4:
                setNext(true);
            break;
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

    return(
        <Box component="div"
            sx={containerStyle}>
            <Box
                maxWidth="sm"
                component="form"
                sx={formStyle}
                noValidate
                autoComplete="off"
                // onSubmit={formik.handleSubmit}
                >
                <Typography gutterBottom variant="h5" sx={{pb: 2}}>
                    {language ? 'Marcar a massagem' : 'Book the massage'}
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                {activeStep === 0 && <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="service-select-label">{language ? 'Serviço' : 'Service'}</InputLabel>
                        <Select
                        labelId="service-select-label"
                        id="service-select"
                        value={service}
                        label="Select Service"
                        onChange={handleServiceChange}
                        >
                        {services.map((serv)=>(
                            <MenuItem key={serv.id} value={serv.name}>{serv.name}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Box>}
                {activeStep === 1 && <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="address-select-label">{language ? 'Endereço' : 'Address'}</InputLabel>
                        <Select
                        labelId="address-select-label"
                        id="address-select"
                        value={address}
                        label="Select Address"
                        onChange={handleAddressChange}
                        >
                        {addressList.map((address)=>(
                            <MenuItem key={address.name} value={address.address}>{address.address}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Box>}
                {activeStep === 2 && <>
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
                                setNext(true);
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
                        renderInput={(params) => <TextField {...params} />}
                        renderLoading={() => <CalendarPickerSkeleton />}
                    /> 
                    
                </>}
                {activeStep === 2 && (activeBooking.date !== '') && (!vacancy || vacancy.hours.length === 0) && !loading &&
                    <Typography sx={{color: 'red', minHeight: '40px'}}>
                        {language ? 
                            'Não há horas livres para este dia, selecione outro dia.' : 
                            'There are no free hours for this day, please select another day.'}
                    </Typography>
                }
                {activeStep === 3 && ((vacancy && vacancy!.hours.length !== 0) ? 
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="hour-select-label">{language ? 'Hora' : 'Hour'}</InputLabel>
                            <Select
                            labelId="hour-select-label"
                            id="hour-select"
                            value={hour}
                            label="Select Hour"
                            onChange={handleHourChange}
                            >
                            {vacancy!.hours.map((hour)=>(
                            <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Box> : 
                    <Typography sx={{color: 'red', minHeight: '40px'}}>
                        {language ? 
                            'Não há horas livres para este dia, selecione outro dia.' : 
                            'There are no free hours for this day, please select another day.'}
                    </Typography>
                )}
                {activeStep === 4 && <Box sx={{ minWidth: 120 }}>
                    <Typography gutterBottom variant='h6' sx={{pb: 2}}>
                        {language ? 'Verifique a sua marcação' : 'Check your appointment'}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 120 }} aria-label="Appointment details">
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {language ? 'Nome:' : 'Name:'}
                                    </TableCell>
                                    <TableCell align="right">{user?.displayName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {language ? 'Telemóvel:' : 'Phone:'}
                                    </TableCell>
                                    <TableCell align="right">{user?.phone}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Email:
                                    </TableCell>
                                    <TableCell align="right">{user?.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {language ? 'Serviço:' : 'Service:'}
                                    </TableCell>
                                    <TableCell align="right">{activeBooking.service}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {language ? 'Endereço:' : 'Address:'}
                                    </TableCell>
                                    <TableCell align="right">{activeBooking.address}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {language ? 'Data:' : 'Date:'}
                                    </TableCell>
                                    <TableCell align="right">{activeBooking.date}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {language ? 'Hora:' : 'Hour:'}
                                    </TableCell>
                                    <TableCell align="right">{activeBooking.hour}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>
                }
                {(activeStep === steps.length && !loading) ? (
                        created ? <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {language ? 'Todas as etapas concluídas - obrigado pela marcação' : 'All steps completed - thank you for appointment'}
                        </Typography>
                        <DoneIcon color='success'/>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button sx={buttonStyle} onClick={handleReset} component={Link} to="/">
                                {language ? 'Ir para a pagina Inicial' : 'Go to Home Page'}
                            </Button>
                        </Box>
                        </> : <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {language ? 
                                'Desculpe, houve um erro ao criar a sua marcação. Por favor, tente novamente mais tarde.' : 
                                'Sorry, there is an error with creating your appointment. Please, try again later.'}
                        </Typography>
                        <ErrorOutlineIcon color='error'/>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button sx={buttonStyle} onClick={handleReset}>Reset</Button>
                        </Box>
                        </>
                    ) : (
                        <>
                        {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                        {loading ? <CircularProgress/> :
                            <Typography variant='body2' sx={{minHeight: '40px'}}>
                                {language ? 
                                    'Se não haver a data/hora precisa, entre em contacto conosco, por favor.' : 
                                    'If there is no necessary date/hour, contact us, please.'}
                            </Typography>}
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', p: 2 }}>
                            <Button
                            color="inherit"
                            disabled={activeStep === 0 || loading}
                            onClick={handleBack}
                            sx={buttonStyle} 
                            >
                            {language ? 'Voltar' : 'Back'}
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button sx={buttonStyle} onClick={handleNext} disabled={!next  || loading}>
                            {language && ((activeStep === steps.length - 1) ? 'Confirmar' : 'Seguinte')}
                            {!language && ((activeStep === steps.length - 1) ? 'Confirm' : 'Next')}
                            </Button>
                        </Box>
                        </>
                    )
                }
            </Box>
        </Box>
    );
}