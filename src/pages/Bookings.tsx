import { Button, Card, CardActions, CardContent, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridCellParams, GridColDef, MuiEvent} from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../components/MessageProvider";
import { getBookings, getBookingsByEmail, setBookingStatus } from "../firebase/documents";
import { BookingDoc } from "../models/Booking";
import { UserContext } from "../components/UserProvider";
import { isBefore, parse } from "date-fns";
import { buttonStyle, containerStyle } from "../theme/styles";
import { LangContext } from "../components/LanguageProvider";

const mdHeight = {
    height: 'calc(100vh - 128px - 6.5rem - 0.35em)'
} as const;

const xsHeight = {
    height: 'calc((100vh - 172px - 6.5rem - 0.35em)/2)'
} as const;

export default function Bookings() {
    const {language}=useContext(LangContext);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const userCtx=useContext(UserContext);
    const user = userCtx!.user;
    const appMessageCtx=useContext(MessageContext);
    const [bookings, setBookings] = useState<BookingDoc[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<BookingDoc | null>(null);
    useEffect(() => {
        if (user && user.role === 'admin'){
            getBookings(appMessageCtx).then(b => {
            if (b) updateOutdatedStatus(b);
        });
        } else if (user) {
            getBookingsByEmail(user.email!, appMessageCtx).then( b => {
                if (b) updateOutdatedStatus(b);
            })
        } else {
            setBookings([]);
        } 
    }, [user]);
    const columns: GridColDef[] = [
        {
            field: 'date',
            headerName: 'Date',
            width: 110,
        },
        {
            field: 'hour',
            headerName: 'Hour',
            width: 90,
        },
        {
            field: 'service',
            headerName: 'Service',
            width: 110,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
        },
    ];

    const updateOutdatedStatus = (bookings: BookingDoc[]) => {
        const today = new Date();
        const newBookings = bookings;
        newBookings.forEach(b => {
            const d = parse(b.date, 'dd/MM/yyyy', new Date());
            if (isBefore(d, today)){
                setBookingStatus(b, 'outdated', appMessageCtx);
            }
        });
        setBookings(newBookings);
    };

    const handleCellClick = (
        params: GridCellParams, 
        event: MuiEvent<React.MouseEvent>, 
        details: GridCallbackDetails) => {
        console.log(params.row);
        const booking = bookings.find(b => b.id === params.row.id)
        if (booking) setSelectedBooking(booking);
    };

    const handleDelete = () => {
        if (selectedBooking) {
            setBookingStatus(selectedBooking, 'deleted', appMessageCtx);
            setSelectedBooking({...selectedBooking, status: 'deleted'});
        }
    };

    return(
        <Container 
            sx={containerStyle}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{padding: '1rem'}}>
                        <Typography gutterBottom variant="h5" component="div">
                                {language ? 'As suas marcações' : 'Your bookings'}
                            </Typography>
                        {(bookings.length > 0) ? <DataGrid
                            getRowId={(row) => row.id} 
                            rows={bookings}
                            columns={columns}
                            pageSize={6}
                            rowsPerPageOptions={[6]}
                            sx={matches ? mdHeight : xsHeight}
                            onCellClick={handleCellClick}
                        /> :
                        <Typography variant="body1" component="div">
                            {language ? 'Nenhuma marcação foi encontrada' : 'No bookings were found'}
                        </Typography>}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    {(bookings.length > 0) && <TableContainer component={Card} sx={{padding: '1rem'}}>
                        {selectedBooking ? <>
                        <Table padding="none">
                            <TableHead>
                                <TableRow>
                                <TableCell colSpan={2}><Typography gutterBottom variant="h5" component="div">
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
                                            {selectedBooking?.displayName}
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
                                        {selectedBooking?.email}
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
                                        {selectedBooking?.phone}
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
                                        {selectedBooking?.date}&ensp;{selectedBooking?.hour}
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
                                        {selectedBooking?.service}
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
                                        {selectedBooking?.address}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="body1" component="div">
                                        Status:
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1" component="div">
                                        {selectedBooking?.status}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button 
                                sx={buttonStyle} onClick={handleDelete} 
                                disabled={selectedBooking?.status==='outdated' || selectedBooking?.status==='deleted'}>
                                    {language ? 'Eliminar' : 'Delete'}
                            </Button>
                        </CardActions>
                        </> :
                        <CardContent>
                            <Typography variant="body1" component="div">
                                {language ? 
                                    'Para ver os detalhes da marcação, selecione uma marcação na lista' : 
                                    'To see booking details please select a booking from the list'}
                            </Typography>
                        </CardContent>}
                    </TableContainer>}
                </Grid>
                
            </Grid>
        </Container>
    );
}