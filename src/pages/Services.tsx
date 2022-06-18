import Container from "@mui/material/Container";
import AppCard from "../components/AppCard";
import Footer from "../components/Footer";
import { services } from "../content/services";

export default function Services(){
    const containerStyle = {
        //background: `url(${image})`,
        backgroundSize: 'cover',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        gap: '2rem',
        width: '100%',
        minHeight: '91.25vh',
        padding: '1.5rem',
    } as const;
    return(
        <>
        <Container 
            sx={containerStyle}>
            {services.map((service)=>(
            <AppCard key={service.id} service={service}/>
            ))}
        </Container>
        <Footer/>
        </>
    );
}