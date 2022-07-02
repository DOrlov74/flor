import { Button, Card, CardActions, CardHeader, IconButton, Stack } from "@mui/material";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { news } from "../content/news";
import { Post } from "../models/Post";
import { LangContext } from "./LanguageProvider";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
    clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const buttonStyle = {
    '&, &:link, &.visited': {
        textTransform: 'none',
        color: 'white',
        transition: 'all .2s'
    },
    '&:hover': {
        transform: 'translateY(-5px)'
    },
    '&:active, &:focus': {
        transform: 'translateY(-2px)'
    }
}

export default function NewsCarousel({clickHandler}: Props){
    const {language}=useContext(LangContext);
    const [newsList, setNewsList] = useState<Post[]>();
    const [post, setPost] = useState<Post | undefined>();
    const [n, setN] = useState<number>(0);
    useEffect(()=>{
        setNewsList(news.sort((a,b)=>(a.date<b.date?1:a.date>b.date?-1:0)));
    }, [news])
    useEffect(()=>{
        if (newsList) setPost(newsList[0]);
    },[newsList])

    const moveLeft = () =>{
        if (newsList) {
            if (n!==0){
                setPost(newsList[n-1]);
                setN(n-1);
            } else {
                setPost(newsList[newsList.length - 1]);
                setN(newsList.length - 1);
            }
        }
    }

    const moveRight = () =>{
        if (newsList) {
            if (n!==newsList.length - 1){
                setPost(newsList[n+1]);
                setN(n+1);
            } else {
                setPost(newsList[0]);
                setN(0);
            }
        }
    }

    return (
        <Stack direction={"row"} alignItems={"center"}>
            <IconButton aria-label="left" onClick={moveLeft} sx={buttonStyle}>
                <ArrowBackIosIcon sx={{mx: '1rem'}}/>
            </IconButton>
            <Card sx={{backgroundColor: 'rgba(0,0,0, 0.3)', color: 'white'}}>
                <CardHeader title={post?.title} sx={{pb: '0', fontStyle: 'italic'}}></CardHeader>
                <CardActions>
                    <Button sx={buttonStyle} onClick={clickHandler} >{language ? 'Saber mais...' : 'Learn more...'}</Button>
                </CardActions>
            </Card>
            <IconButton aria-label="left" onClick={moveRight} sx={buttonStyle}>
                <ArrowForwardIosIcon sx={{mx: '1rem'}}/>
            </IconButton>
        </Stack>
    )
}