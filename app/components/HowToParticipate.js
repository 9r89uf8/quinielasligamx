// components/HowToParticipicipate.js
import React from 'react';
import {
    Paper,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Box,
} from '@mui/material';
import {
    AccountCircle,
    SportsSoccer,
    HourglassEmpty,
    EmojiEvents,
} from '@mui/icons-material';

const steps = [
    {
        label: 'Regístrate en la plataforma',
        icon: <AccountCircle />,
    },
    {
        label: 'Selecciona tus predicciones para los partidos de la jornada',
        icon: <SportsSoccer />,
    },
    {
        label: 'Espera los resultados',
        icon: <HourglassEmpty />,
    },
    {
        label: 'Si aciertas, ¡gana premios en efectivo!',
        icon: <EmojiEvents />,
    },
];

const HowToParticipate = () => {
    return (
        <Paper
            sx={{
                background: 'linear-gradient(135deg, #f8f9fa, #dee2e6)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: 4,
                marginTop: 4,
                marginBottom: 4,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                ¿Cómo participar en la Quiniela Liga MX?
            </Typography>

            <Box sx={{ width: '100%', mt: 4 }}>
                <Stepper orientation="vertical" nonLinear>
                    {steps.map((step, index) => (
                        <Step key={index} active>
                            <StepLabel
                                icon={
                                    <Box
                                        sx={{
                                            color: 'white',
                                            backgroundColor: 'primary.main',
                                            borderRadius: '50%',
                                            width: 40,
                                            height: 40,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {step.icon}
                                    </Box>
                                }
                            >
                                <Typography variant="h6">{step.label}</Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Paper>
    );
};

export default HowToParticipate;

