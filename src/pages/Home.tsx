import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import image from "../assets/background3.jpg";
import iphone from "../assets/iphone_opt.jpg";
import Footer from "../components/Footer";
import InstaLink from "../components/InstaLink";
import { MessageContext } from "../components/MessageProvider";
import NewsCard from "../components/NewsCard";
import NewsCarousel from "../components/NewsCarousel";
import NewsLink from "../components/NewsLink";
import Promo from "../components/Promo";
import { getPosts } from "../firebase/documents";
import { Post } from "../models/Post";

const containerStyle = {
    background: `url(${image})`,
    backgroundSize: 'cover',
    position: 'relative',
    width: '100%',
    minHeight: {xs:'calc(100vh - 182px)', md:'calc(100vh - 128px)'},
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
            if (n) setNewsList(n.sort((a,b)=>(a.date<b.date?-1:a.date>b.date?1:0)));
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