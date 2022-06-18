import { Avatar, Badge, Button, Card, CardActions, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Post } from "../models/Post";
import { LangContext } from "./LanguageProvider";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import { cardStyle } from "../theme/styles";

interface Props {
    post: Post;
}

export default function NewsCard({post}: Props){
    const {language}=useContext(LangContext);
    const [curPost, setPost] = useState(post);
    const {id, date, author, title, enTitle, content, enContent, likes}= post;

    const addLike=()=>{
        setPost({...curPost, likes: ++curPost.likes});
    };
  
    return (
      <Card sx={cardStyle}>
        <CardHeader
            avatar={
                <Avatar alt={author.displayName ? author.displayName : "unknown"} 
                src={(author.photoURL) ? author.photoURL : "../assets/avatar.png"} />
            }
            title={language? title : enTitle}
            subheader={`${date} ${language ? 'por' : 'by'} ${author.displayName}`}
            titleTypographyProps={{variant: "h6"}}
        />
        <CardContent>
            {language ? content.map(c => (
                <Typography variant="body1">
                    {c}
                </Typography>
            )): enContent.map(c => (
                <Typography variant="body1">
                    {c}
                </Typography>
            ))}
        </CardContent>
        <CardActions>
            <Stack direction="row" spacing={5}>
                <IconButton aria-label="like" onClick={addLike}>
                    <Badge badgeContent={likes}>
                        <FavoriteIcon color={likes?"secondary":"disabled"}/>
                    </Badge>
                </IconButton>
                <Button sx={{textTransform: 'none'}} component={Link} to={'/book'} >{language ? 'Marcar a massagem' : 'Book a massage'}</Button>
            {/* <Button sx={{textTransform: 'none'}} component={Link} to={`/news/${id}`} >{language ? 'mais ...' : 'more ...'}</Button> */}
            </Stack>
        </CardActions>
      </Card>
    );
  }