import { Avatar, Badge, Button, Card, CardActions, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Post } from "../models/Post";
import { LangContext } from "./LanguageProvider";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import avatar2 from "../assets/avatar2.png";
import { deletePostDoc, updateLikeToPostDoc } from "../firebase/documents";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { UserContext } from "./UserProvider";
import { MessageContext } from "./MessageProvider";
import { florPrimary } from "../theme/colors";

interface Props {
    post: Post;
    newsRef?: any;
}

const newsCardStyle = {
    width: {xs: '350px', md: '600px'},
    margin: '1rem auto',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: `5px 5px 5px ${florPrimary[900]}`,
} as const;

export default function NewsCard({post, newsRef}: Props){
    const appMessageCtx=useContext(MessageContext);
    const userCtx=useContext(UserContext);
    const user = userCtx?.user;
    const {language}=useContext(LangContext);
    const [curPost, setPost] = useState(post);
    const {id, date, author, title, enTitle, content, enContent, likes}= post;
    let count=0;

    const addLike=()=>{
        const newlikes = ++curPost.likes;
        setPost({...curPost, likes: newlikes});
        updateLikeToPostDoc({...curPost, likes: newlikes});
    };

    const handleDelete=()=>{
        deletePostDoc(post, appMessageCtx);
    }
  
    return (
      <Card key={`id${id}`} sx={newsCardStyle} ref={newsRef}>
        <CardHeader
            avatar={
                <Avatar alt={author.displayName ? author.displayName : "unknown"} 
                src={author.photoURL ? author.photoURL : author.uid === 'ct7MTj8FG9WmeV8fmPNtFFtn1Pz1' ? avatar2 : avatar} />
            }
            title={language? title : enTitle}
            subheader={`${date} ${language ? 'por' : 'by'} ${author.displayName}`}
            titleTypographyProps={{variant: "h6"}}
        />
        <CardContent>
            {language ? content.map(c => (
                <Typography key={++count} variant="body1">
                    {c}
                </Typography>
            )): enContent.map(c => (
                <Typography key={++count} variant="body1">
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
                <Button sx={{textTransform: 'none'}} component={Link} to={'/sendmessage'} >{language ? 'Marcar a massagem' : 'Book a massage'}</Button>
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