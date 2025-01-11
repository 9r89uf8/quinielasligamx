'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {Container, Typography, CircularProgress, Button, Paper} from '@mui/material';
import { useStore } from '@/app/store/store';
import { verifySession } from '@/app/services/stripeService';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const PaymentResultPage = () => {
    const router = useRouter();
    const [verifying, setVerifying] = useState(true);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');

        const verifyPayment = async () => {
            if (!sessionId) {
                setError('Invalid session ID');
                setVerifying(false);
                return;
            }

            try {
                const result = await verifySession(sessionId);
                if (result.success) {
                    setStatus('success');
                } else if (result.error === 'PROCESSING') {
                    // If still processing and under retry limit, try again
                    if (retryCount < 3) {
                        setTimeout(() => {
                            setRetryCount(prev => prev + 1);
                        }, 2000); // Wait 2 seconds before retrying
                        return;
                    }
                    setError('Payment verification timeout');
                } else {
                    setStatus('failed');
                }
            } catch (err) {
                setError(err.message);
                setStatus('failed');
            } finally {
                setVerifying(false);
            }
        };

        verifyPayment();
    }, [retryCount]); // Re-run when retryCount changes

    const handleNavigate = () => {
        router.push('/quinielas/dashboard');
    };

    if (verifying) {
        return (
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center', width: '100%' }}>
                    <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
                        Por favor espera unos segundos.
                    </Typography>
                    <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
                        No toques nada.
                    </Typography>
                    <CircularProgress />
                    {retryCount > 0 && (
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Verificando pago... Intento {retryCount}/3
                        </Typography>
                    )}
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center', width: '100%' }}>
                {status === 'success' ? (
                    <>
                        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                            ¡Pago Exitoso!
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
                            {error ? 'Error en el Pago' : 'Pago Cancelado'}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            {error ?
                                'Hubo un error procesando su pago. Por favor, contacte a soporte.' :
                                'Su pago no se completó. Si tuvo algún problema, inténtelo de nuevo o comuníquese con nuestro equipo de soporte.'}
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

export default PaymentResultPage;
