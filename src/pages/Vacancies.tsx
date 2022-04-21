import { DatePicker, TimePicker } from "@mui/lab";
import { Box, Button, Card, CardActions, CardContent, Chip, Grid, Stack, TextField, Typography } from "@mui/material";
import { addDays, format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "../components/LanguageProvider";
import { MessageContext } from "../components/MessageProvider";
import { UserContext } from "../components/UserProvider";
import { createVacancyDoc, deleteVacancyDoc, getVacancies } from "../firebase/documents";
import { Vacancy } from "../models/Vacancy";
import { buttonStyle, containerStyle } from "../theme/styles";
    
export default function Vacancies() {
    const {language}=useContext(LangContext);
    const userCtx=useContext(UserContext);
    const user = userCtx!.user;
    const appMessageCtx=useContext(MessageContext);
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
    const [addDate, setAddDate] = useState(false);
    const [addHour, setAddHour] = useState(false);
    const [value, setValue] = useState<Date | null>(null);

    useEffect(() => {
        if (user && user.role === 'admin'){
            getVacancies(appMessageCtx).then(v => {
            if (v) setVacancies(v);
        })}
    }, [user]);

    const handleDateClick = (event: React.MouseEvent) => {
        const target = event.target as HTMLButtonElement;
        const v = vacancies.find(v => v.date === target.innerText);
        if (v) setSelectedVacancy(v);
    }

    const handleDateDelete = (event: React.MouseEvent) => {
        const target = event.target as HTMLButtonElement;
        const chip = target.previousElementSibling as HTMLButtonElement;
        const d = chip.innerText;
        const vac = vacancies.find(v => v.date === d);
        if (vac) {
            setVacancies([...vacancies.filter(i => i.id !== vac.id)]);
            if (vac.id === selectedVacancy?.id) setSelectedVacancy(null);
            deleteVacancyDoc(vac, appMessageCtx);
        }
    }

    const handleHourClick = (event: React.MouseEvent<HTMLDivElement>) => {
        //console.log(event.target);
    }

    const handleHourDelete = (event: React.MouseEvent) => {
        const target = event.target as HTMLButtonElement; 
        const chip = target.previousElementSibling as HTMLButtonElement;
        const t = chip?.innerText;
        //console.log(t);
        if (selectedVacancy?.hours.some(h => h === t)){
            setVacancies([
                ...vacancies.filter(i => i.id !== selectedVacancy.id), 
                {...selectedVacancy, 
                    hours: [...selectedVacancy.hours.filter(h => h !== t)]}
            ]);
            setSelectedVacancy({...selectedVacancy, 
                hours: [...selectedVacancy.hours.filter(h => h !== t)]});
        }
    }

    const handleAddHour = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAddHour(true);
    };

    const handleAddDate = () => {
        setAddDate(true);
    };

    const handleSaveVacancy = () => {
        if (selectedVacancy) {
            setAddHour(false);
            createVacancyDoc(selectedVacancy, appMessageCtx);
        }
    };

    return(
        <Box 
            sx={containerStyle}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                    {language ? 'As suas vagas' : 'Your vacancies'}
                                </Typography>
                            <Stack direction="row" spacing={1} sx={{m: '1rem', flexWrap: 'wrap'}}>
                            {(vacancies.length > 0) ? 
                                vacancies.map(v => (
                                    <Chip
                                    key={v.date}
                                    label={v.date}
                                    onClick={handleDateClick}
                                    onDelete={handleDateDelete}
                                    color={v.date === selectedVacancy?.date ? 'secondary' : 'default'}
                                />)) :
                            <Typography variant="body1" component="div">
                                {language ? 'Nenhuma vaga foi encontrada' : 'No vacancies were found'}
                            </Typography>}
                            </Stack>
                            {addDate && <DatePicker
                                minDate={addDays(new Date(), 1)}
                                label="Select a date"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                                onAccept={(newValue) => {
                                    if (newValue){
                                        const d = format(newValue, 'dd/MM/yyyy');
                                        const v = {
                                            id: `${Date.now()}`,
                                            date: d,
                                            hours: []
                                        };
                                        const vac = vacancies.find(i => i.date === d);
                                        if (vac) {
                                            setSelectedVacancy(vac);
                                        } else {
                                            setSelectedVacancy(v);
                                            setVacancies([...vacancies, v]);
                                        }
                                        setAddDate(false);
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            /> }
                        </CardContent>
                        <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button 
                                sx={buttonStyle} onClick={handleAddDate} disabled={addDate}>
                                {language ? 'Addicionar Data' : 'Add Date'}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    {(vacancies.length > 0) && <Card>
                        {selectedVacancy ? <>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {language ? 'Horários disponíveis:' : 'Available Hours:'}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{m: '1rem', flexWrap: 'wrap'}}>
                            {selectedVacancy.hours.map(h => (
                                <Chip key={h} label={h} onClick={handleHourClick} onDelete={handleHourDelete}/>
                            ))}
                            </Stack>
                            {addHour && <TimePicker
                                label="Select an hour"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                                onAccept={(newValue)=>{
                                    if (newValue){
                                        const t = format(newValue, 'HH:mm');
                                        if (!selectedVacancy.hours.some(h => h === t)){
                                            setVacancies([
                                                ...vacancies.filter(i => i.id !== selectedVacancy.id), 
                                                {...selectedVacancy, hours: [...selectedVacancy.hours, t]}
                                            ]);
                                            setSelectedVacancy({...selectedVacancy, hours: [...selectedVacancy.hours, t]});
                                        }
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            /> }
                        </CardContent>            
                        <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button 
                                sx={buttonStyle} onClick={handleAddHour} disabled={addHour}>
                                    {language ? 'Addicionar hora' : 'Add Hour'}
                            </Button>
                            <Button 
                                sx={buttonStyle} onClick={handleSaveVacancy}>
                                    {language ? 'Guardar' : 'Save'}
                            </Button>
                        </CardActions>
                        </> :
                        <CardContent>
                            <Typography variant="body1" component="div">
                                {language ? 
                                    'Para ver os horários disponíveis, selecione uma vaga na lista' : 
                                    'To see available hours please select a vacancy from the list'}
                            </Typography>
                        </CardContent>}
                    </Card>}
                </Grid>
                
            </Grid>
        </Box>
    );
}