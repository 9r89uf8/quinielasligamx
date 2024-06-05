'use client';

import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {createPost} from "@/app/services/postService";


const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let post = {title, content}
        try {
            const addedPost = await createPost(post);
            if(addedPost){
                router.push('/posts');
            }
        } catch (error) {
            console.log('error')
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Create Post
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create
                </Button>
            </form>
        </Container>
    );
};

export default CreatePost;

