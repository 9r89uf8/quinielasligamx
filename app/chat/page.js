'use client';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/app/store/store';
import ConversationHistory from '@/app/components/chat/ConversationHistory';
import { fetchMessages, sendChatPrompt } from '@/app/services/chatService';
import {
    Container,
    Paper,
    Typography,
    InputBase,
    Button,
    styled,
    alpha
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
    color: '#ffffff',
    background: 'linear-gradient(45deg, #343a40, #001219)',
    backdropFilter: 'blur(10px)',
    borderRadius: 10,
    border: `1px solid ${alpha('#ffffff', 0.2)}`,
}));

const generateRandomUserId = () => {
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
    return randomNumber.toString();
};

const Chat = () => {
    const [prompt, setPrompt] = useState('');
    const user = useStore((state) => state.user);
    const jornada = useStore((state) => state.jornada);
    const conversationHistory = useStore((state) => state.conversationHistory);
    const messageSent = useStore((state) => state.messageSent);

    const [localUserId, setLocalUserId] = useState('');

    useEffect(() => {
        if (!user) {
            let randomUserId = localStorage.getItem('randomUserId');
            if (!randomUserId) {
                randomUserId = generateRandomUserId();
                localStorage.setItem('randomUserId', randomUserId);
            }
            setLocalUserId(randomUserId);
        } else {
            setLocalUserId(user.uid);
        }
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await sendChatPrompt({ userId: user ? user.uid : localUserId, userMessage: prompt, jornada });
        setPrompt('');
    };

    useEffect(() => {
        if (user || localUserId) {
            fetchMessages({ userId: user ? user.uid : localUserId });
        }
    }, [localUserId, user]);

    const isPromptEntered = prompt.trim().length > 0;

    return (
        <Container maxWidth="sm">
            <ConversationHistory conversationHistory={conversationHistory} user={user} />

            {conversationHistory && conversationHistory.length <= 0 && (
                <Item elevation={6}>
                    <Typography variant="h5" component="h2" gutterBottom style={{ color: 'white' }}>
                        Escribe tu pregunta y te respondemos al instante.
                    </Typography>
                </Item>
            )}

            <Paper
                elevation={4}
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: 5 }}
                onSubmit={handleSubmit}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, padding: 2 }}
                    placeholder={messageSent ? 'Escribiendo...' : 'Escribe algo...'}
                    multiline
                    required
                    minRows={1}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    maxRows={4}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />

                {isPromptEntered && (
                    <Button
                        type="submit"
                        disabled={!isPromptEntered || messageSent}
                        style={{ marginLeft: 8 }}
                    >
                        Enviar
                    </Button>
                )}
            </Paper>
        </Container>
    );
};

export default Chat;
