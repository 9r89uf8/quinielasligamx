'use client';

import React, { useState } from 'react';
import { Button, TextField, Box, Card, Typography, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { passwordReset } from '@/app/services/authService';

import {alpha, styled} from "@mui/material/styles";


const GlassCard = styled(Card)({
    textAlign: 'center',
    marginTop: 15,
    color: 'black',
    background: '#ffffff', // semi-transparent white
    backdropFilter: 'blur(10px)', // apply blur
    borderRadius: 10, // rounded corners
    border: `1px solid ${alpha('#ffffff', 0.2)}`,
});

const GradientButton = styled(Button)(({ theme }) => ({
    background: 'black',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    padding: '6px 16px',
    margin: '4px',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
    '&.selected': {
        background: 'rgba(255, 255, 255, 0.5)',
    },
}));

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await passwordReset(email);
        setIsLoading(false);
        setIsSubmitted(true);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
            }}
        >
            <GlassCard sx={{ width: '380px', maxWidth: '90%', padding: 3 }}>
                <Typography variant="h4" sx={{ color: 'black', marginBottom: 3, fontWeight: 'bold' }}>
                    Solicitud de nueva contraseña
                </Typography>
                <Typography variant="h6" sx={{ color: 'black', marginBottom: 2 }}>
                    Introduce tu correo electrónico
                </Typography>

                {isSubmitted ? (
                    <Alert severity="success" sx={{ mb: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)', color: 'black', fontSize: 19 }}>
                        Por favor, revisa tu correo electrónico para encontrar el correo para crear una nueva contraseña.
                    </Alert>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Correo electrónico"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <LockOutlinedIcon sx={{ color: 'black', mr: 1 }} />
                                ),
                            }}
                        />

                        <GradientButton type="submit" disabled={isLoading || isSubmitted}>
                            {isLoading ? "Enviando..." : "Enviar"}
                        </GradientButton>
                    </form>
                )}
            </GlassCard>
        </Box>
    );
};

export default ResetPassword;
