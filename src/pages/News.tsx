import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { LangContext } from "../components/LanguageProvider";
import NewsCard from "../components/NewsCard";
import { buttonStyle, containerStyle, formStyle } from "../theme/styles";
import { UserContext } from "../components/UserProvider";
import { format } from "date-fns";
import { MessageContext } from "../components/MessageProvider";
import { createPostDoc, getPosts } from "../firebase/documents";
import { Post } from "../models/Post";

const validationSchema = yup.object({
    name: yup
        .string()
        .min(4, 'Name should be of minimum 4 characters length')
        .required('Name is required'),
    title: yup
        .string()
        .min(4, 'Title should be of minimum 4 characters length')
        .required('Title is required'),
    enTitle: yup
        .string()
        .min(4, 'English title should be of minimum 4 characters length')
        .required('English title is required'),
    contentStr: yup
        .string()
        .min(8, 'Content should be of minimum 8 characters length')
        .required('Content is required'),
    enContentStr: yup
        .string()
        .min(8, 'English content should be of minimum 8 characters length')
        .required('English content is required'),
});

export default function News(){
    const {language}=useContext(LangContext);
    const userCtx=useContext(UserContext);
    const user = userCtx!.user;
    const appMessageCtx=useContext(MessageContext);
    const [addPost, setAddPost] = useState(false);
    const [newsList, setNewsList] = useState<Post[]>([]);
    useEffect(()=>{
        if (user && user.role === 'admin'){
            getPosts(appMessageCtx).then(n => {
            if (n) setNewsList(n.sort((a,b)=>(a.date<b.date?-1:a.date>b.date?1:0)));
        })} else {
            setNewsList([]);
        }
    },[user])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user!.displayName,
            title: '',
            enTitle: '',
            contentStr: '',
            enContentStr: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const {name, title, enTitle, contentStr, enContentStr} = values;
            const content = contentStr.split(/\r?\n/);
            const enContent = enContentStr.split(/\r?\n/);
            const date = format(new Date(), 'dd/MM/yyyy');
            const author = {uid: user!.uid, displayName: name, photoURL: user!.photoURL};
            const id = `${Date.now()}`;
            const likes = 0;
            const post = {id, date, author, title, enTitle, content, enContent, likes};
            createPostDoc(post, appMessageCtx)
                .then(result => {
                    if (result){
                        setAddPost(false);
                        setNewsList([...newsList, post]);
                    } 
                });
        },
    });

    const handleAddPost = () => {
        setAddPost(true);
    };

    return(
        <>
        <Box 
            sx={containerStyle}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {newsList.map(post => (
                        <NewsCard key= {post.id} post={post}/>
                    ))}
                    <Stack direction="row" justifyContent={'center'}>
                        <Button 
                            sx={buttonStyle} onClick={handleAddPost} disabled={addPost}>
                            {language ? 'Addicionar Noticia' : 'Add Post'}
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    {addPost && <Box
                        maxWidth="sm"
                        component="form"
                        sx={formStyle}
                        noValidate
                        autoComplete="off"
                        onSubmit={formik.handleSubmit}
                        >
                        <Typography variant="h5" >
                            Add a post
                        </Typography>
                        <TextField
                            fullWidth
                            variant="standard"
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            autoFocus
                            fullWidth
                            variant="standard"
                            id="title"
                            name="title"
                            label="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            fullWidth
                            variant="standard"
                            id="enTitle"
                            name="enTitle"
                            label="English Title"
                            value={formik.values.enTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.enTitle && Boolean(formik.errors.enTitle)}
                            helperText={formik.touched.enTitle && formik.errors.enTitle}
                        />
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            variant="standard"
                            id="content"
                            name="contentStr"
                            label="ContentStr"
                            value={formik.values.contentStr}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.contentStr && Boolean(formik.errors.contentStr)}
                            helperText={formik.touched.contentStr && formik.errors.contentStr}
                        />
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            variant="standard"
                            id="enContentStr"
                            name="enContentStr"
                            label="English Content"
                            value={formik.values.enContentStr}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.enContentStr && Boolean(formik.errors.enContentStr)}
                            helperText={formik.touched.enContentStr && formik.errors.enContentStr}
                        />
                        <Stack direction="row" spacing={5}>
                            <Button sx={buttonStyle} size="large" type="submit">
                                {language ? 'Enviar' : 'Submit'}
                            </Button>
                            <Button sx={buttonStyle} size="large" onClick={()=>{setAddPost(false)}}>
                                {language ? 'Cancelar' : 'Cancel'}
                            </Button>
                        </Stack>
                    </Box>}
                </Grid>
                
            </Grid>
        </Box>
        <Footer/>
        </>
    )
}