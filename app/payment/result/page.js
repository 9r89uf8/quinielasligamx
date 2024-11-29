// pages/result.jsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {Container, Typography, CircularProgress, Button, Paper} from '@mui/material';
import { useStore } from '@/app/store/store';
import { verifySession } from '@/app/services/stripeService';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const page = () => {
    const router = useRouter();
    const verifying = useStore((state) => state.verifying);
    const status = useStore((state) => state.status);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');

        if (sessionId) {
            verifySession(sessionId);
        }
    }, []);

    if (verifying || status === null) {
        return (
            <Container
                maxWidth="sm"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
            >
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center', width: '100%' }}>
                    <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
                        por favor espera unos segundos.
                    </Typography>
                    <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
                        no toques nada.
                    </Typography>
                    <CircularProgress />
                </Paper>
            </Container>
        );
    }

    const handleNavigate = () => {
        router.push('/quinielas/dashboard'); // Replace '/register' with the path you want to navigate to
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center', width: '100%' }}>
                {status === 'success' ? (
                    <>
                        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                            Pago Exitoso!
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleNavigate}
                            sx={{
                                backgroundImage: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                                color: 'white',
                                py: 1.5,
                                px: 4,
                                borderRadius: 4,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                '&:hover': {
                                    backgroundImage: 'linear-gradient(45deg, #1e88e5, #1eb8e5)',
                                },
                            }}
                        >
                            Ver mis quinielas
                        </Button>
                    </>
                ) : (
                    <>
                        <CancelOutlinedIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                            Pago Cancelado
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Su pago no se completó. Si tuvo algún problema, inténtelo de nuevo o comuníquese con nuestro equipo de soporte.
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => router.push('/buy')}
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 4,
                                fontWeight: 'bold',
                                textTransform: 'none',
                            }}
                        >
                            Regresar
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default page;
