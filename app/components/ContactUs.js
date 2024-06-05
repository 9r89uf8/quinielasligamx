import React from 'react';
import { Box, Button, Typography, styled, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/PeopleAltOutlined';
import {useRouter} from "next/navigation";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
    color: 'white',
    boxShadow: theme.shadows[3],
    '&:before': {
        backgroundColor: 'transparent',
    },
    borderRadius: 12,
    marginTop: 2,
    marginBottom: 40
}));

const StyledButton = styled(Button)(({ theme }) => ({
    color: 'white',
    background: "linear-gradient(45deg, #343a40 30%, #212529 90%)",
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    padding: theme.spacing(1, 4),
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
    gap: theme.spacing(1),
}));

const ContactUs = () => {
    const router = useRouter();

    const handleChatRedirect = () => {
        router.push('/chat')
    };

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom align="center" color="inherit">
                Tienes preguntas?
            </Typography>
            <Typography variant="h6" align="center" style={{color: '#f8f9fa', margin: '5px auto 10px auto'}}>
                Si tiene alguna pregunta, no dude en enviarnos un mensaje.
            </Typography>
            <StyledButton onClick={handleChatRedirect} startIcon={<ChatIcon />}>
                Enviar Mensaje
            </StyledButton>
            {/*<Box display="flex" alignItems="center" gap={1}>*/}
            {/*    <PeopleIcon color="action" />*/}
            {/*    <Typography variant="body2" color="textSecondary">*/}
            {/*        Join over 15,000 playing users in Mexico and the USA!*/}
            {/*    </Typography>*/}
            {/*</Box>*/}
        </StyledPaper>
    );
};

export default ContactUs;
