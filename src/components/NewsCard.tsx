import { Avatar, Badge, Button, Card, CardActions, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Post } from "../models/Post";
import { LangContext } from "./LanguageProvider";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import { cardStyle } from "../theme/styles";
import avatar from "../assets/avatar.png";
import avatar2 from "../assets/avatar2.png";
import { deletePostDoc, updateLikeToPostDoc } from "../firebase/documents";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { UserContext } from "./UserProvider";
import { MessageContext } from "./MessageProvider";

interface Props {
    post: Post;
    newsRef?: any;
}

export default function NewsCard({post, newsRef}: Props){
    const appMessageCtx=useContext(MessageContext);
    const userCtx=useContext(UserContext);
    const user = userCtx?.user;
    const {language}=useContext(LangContext);
    const [curPost, setPost] = useState(post);
    const {id, date, author, title, enTitle, content, enContent, likes}= post;

    const addLike=()=>{
        const newlikes = ++curPost.likes;
        setPost({...curPost, likes: newlikes});
        updateLikeToPostDoc({...curPost, likes: newlikes});
    };

    const handleDelete=()=>{
        deletePostDoc(post, appMessageCtx);
    }
  
    return (
      <Card sx={cardStyle} ref={newsRef}>
        <CardHeader
            avatar={
                <Avatar alt={author.displayName ? author.displayName : "unknown"} 
                src={author.photoURL ? author.photoURL : author.uid === 'ae45R0bTxxS5DCDaOSs66I2ZbU63' ? avatar2 : avatar} />
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
                {(user?.role === 'admin') && 
                    <IconButton aria-label="like" onClick={handleDelete}>
                        <DeleteOutlineIcon color={"secondary"}/>
                    </IconButton>
                }
            </Stack>
        </CardActions>
      </Card>
    );
  }