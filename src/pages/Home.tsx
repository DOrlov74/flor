import { Box, Grid, Stack } from "@mui/material";
import { parse } from "date-fns";
import React, { useContext, useEffect, useRef, useState } from "react";
import image from "../assets/background3.jpg";
import iphone from "../assets/iphone_opt.jpg";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import InstaLink from "../components/InstaLink";
import { MessageContext } from "../components/MessageProvider";
import NewsCard from "../components/NewsCard";
import NewsCarousel from "../components/NewsCarousel";
import NewsLink from "../components/NewsLink";
import Promo from "../components/Promo";
import ServicesCorousel from "../components/ServicesCarousel";
import { getPosts } from "../firebase/documents";
import { Post } from "../models/Post";

const containerStyle = {
    background: `radial-gradient(95.67% 157.73% at 22.81% 4.33%, #AB9475 27.46%, rgba(255, 255, 255, 0) 56.94%), url(${image})`,
    //background: 'linear-gradient(126.64deg, #AB9475 25.88%, rgba(255, 255, 255, 0) 48.84%)',
    backgroundSize: 'cover',
    position: 'relative',
    width: '100%',
    minHeight: {xs:'calc(100vh - 182px)', md:'calc(100vh - 128px)'},
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'space-between',
    color: 'white',
    
} as const;
const newsContainerStyle = {
    background: `url(${iphone})`,
    backgroundSize: 'cover',
    position: 'relative',
    width: '100%',
    minHeight: {xs:'calc(100vh - 132px)', md:'calc(100vh - 64px)'},
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: 'white',
    
} as const;

export default function Home() {
    const appMessageCtx=useContext(MessageContext);
    const [newsList, setNewsList] = useState<Post[]>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    useEffect(()=>{
        getPosts(appMessageCtx).then(n => {
            if (n) setNewsList(n.sort((a,b)=>{
                const ad = parse(a.date, 'dd/MM/yyyy', new Date());
                const bd = parse(b.date, 'dd/MM/yyyy', new Date());
                if (ad < bd) return 1;
                else if (ad > bd) return -1;
                else return 0;
            }).slice(0, 2));
        })
    },[])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const newsRef = useRef<null | HTMLDivElement>(null)
    const scrollToNews = () => {
        if (newsRef && newsRef.current) newsRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }

    return(
        <>
        <Box 
            component="div"
            sx={containerStyle}>
            <Promo/>
            {/* <NewsCarousel clickHandler={scrollToNews}/> */}
            <Stack direction={{xs:'column', md:'row'}} spacing={5}  sx={{backgroundColor: 'rgba(0,0,0, 0.2)'}}>
                <Box sx={{margin: {xs:'0 0.5rem', md:'0 2rem'}, alignItems: 'center'}}>
                    <ServicesCorousel/>
                </Box>
                    <Feedback/>
            </Stack>
            <NewsLink clickHandler={scrollToNews}/>
        </Box>
        <Box
            component="div"
            sx={newsContainerStyle}>
            {newsList.map(post => (
                <NewsCard key= {post.id} post={post} newsRef={newsRef}/>
            ))}
            
        </Box>
        <InstaLink pos={scrollPosition}/>
        
        <Footer pos={scrollPosition} />
        </>
    )
}