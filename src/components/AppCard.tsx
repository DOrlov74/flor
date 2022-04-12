import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Service } from "../models/Service";
import therapeutic from '../assets/back_opt.jpg';
import ultrasonic from '../assets/ultra_opt.jpg';
import paraffin from '../assets/parafina_opt.jpg';
import facial from '../assets/facial_opt.jpg';
import radio from '../assets/radio_opt.jpg';
import presso from '../assets/presso_opt.jpg';
import { florSecondary } from "../theme/colors";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import { useContext } from "react";
import { LangContext } from "./LanguageProvider";

interface Props {
    service: Service;
}

const images = {
    'therapeutic': therapeutic, 
    'ultrasonic': ultrasonic,
    'paraffin': paraffin,
    'facial': facial,
    'radio': radio,
    'presso': presso
};

export default function AppCard({service}: Props){
  const {language}=useContext(LangContext);
    const {id, name, prices, duration}= service;

    let image;
    Object.entries(images).find(([k, v]) => {
        if (k===id){
            image=v;
            return true;
        }else{
            return false;
        }});
    return (
    <Card sx={{ width: 350 }}>
      <CardMedia
        component="img"
        height="150"
        src={image}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1">
            Duração: &ensp;  {duration} min
        </Typography>
        <Divider />
            {prices.map((p) => (
            <>
            <Stack key={p.address} direction="row" spacing={5}>
              <Typography variant="body1" color={florSecondary[900]}>
              Endereço: &ensp;  {p.address} 
              </Typography>
              <Typography variant="body1" color={florSecondary[900]}>
              Preço: &ensp;  {p.price} &euro;
              </Typography>
            </Stack>
            <Divider key={`${p.address}  ${p.price}`}/>
            </>
            ))}
      </CardContent>
      <CardActions>
        <Button sx={{textTransform: 'none'}} component={Link} to={`/book/${id}`} >{language ? 'Marcar' : 'Book'}</Button>
        <Button sx={{textTransform: 'none'}} component={Link} to={`/service/${id}`} >{language ? 'Saber mais' : 'Learn more'}</Button>
      </CardActions>
    </Card>
  );
}