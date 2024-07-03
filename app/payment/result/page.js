// pages/result.jsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {Container, Typography, CircularProgress, Button} from '@mui/material';
import { useStore } from '@/app/store/store';
import { verifySession } from '@/app/services/stripeService';

const page = () => {
    const router = useRouter();
    const loading = useStore((state) => state.loading);
    const status = useStore((state) => state.status);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');

        if (sessionId) {
            verifySession(sessionId);
        } else {
            useStripeStore.getState().setStatus('cancel');
            useStripeStore.getState().setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <Container maxWidth="sm">
                <CircularProgress />
            </Container>
        );
    }

    const handleNavigate = () => {
        router.push('/quinielas/user'); // Replace '/register' with the path you want to navigate to
    };

    return (
        <Container maxWidth="sm">
            {status === 'success' ? (
                    <div style={{textAlign: "center", marginTop: 15}}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Pago Exitoso!
                        </Typography>
                        <Button
                            onClick={handleNavigate}
                            style={{
                                backgroundImage: 'linear-gradient(45deg, #32cd32, #008080)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                boxShadow: '0 3px 5px 2px rgba(50, 205, 50, .3)',
                                marginTop: '20px'
                            }}
                        >
                            Ver Mis Quinielas
                        </Button>
                    </div>

            ) : (
                <div style={{textAlign: "center", marginTop: 15}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Pago Cancelado
                    </Typography>
                </div>

            )}
        </Container>
    );
};

export default page;
