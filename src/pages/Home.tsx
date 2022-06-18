import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import image from "../assets/background3.jpg";
import iphone from "../assets/iphone_opt.jpg";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import Promo from "../components/Promo";
import { news } from "../content/news";

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
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <>
        <Box 
            component="div"
            sx={containerStyle}>
            <Promo/>
        </Box>
        <Box
            component="div"
            sx={newsContainerStyle}>
            {news.sort((a,b)=>(a.date<b.date?1:a.date>b.date?-1:0)).map(post => (
                <NewsCard key= {post.id} post={post}/>
            ))}
        </Box>
        <Footer pos={scrollPosition}/>
        </>
    )
}