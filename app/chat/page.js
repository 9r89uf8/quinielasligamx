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
    marginTop: 15,
    marginBottom: 30,
    color: '#222222',
    background: 'linear-gradient(135deg, #f8f9fa, #dee2e6)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: 2,
    borderRadius: 2,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backdropFilter: 'blur(10px)'
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
                    <Typography variant="h5" component="h2" gutterBottom style={{ }}>
                        Escribe tu pregunta y te respondemos al instante.
                    </Typography>
                </Item>
            )}

            <Paper
                elevation={4}
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: 5, marginBottom: 5 }}
                onSubmit={handleSubmit}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, padding: 2 }}
                    placeholder={messageSent ? 'Escribiendo...' : 'Escribe tu pregunta...'}
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
