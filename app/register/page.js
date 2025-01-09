'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, registerUserGoogle } from "@/app/services/authService";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { alpha, styled } from '@mui/material/styles';
import Link from 'next/link';

// 1) Import GoogleAuthProvider and signInWithPopup
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// 2) Import your firebase auth object
import {auth} from "@/app/utils/firebaseClient";

const GlassCard = styled(Card)({
    textAlign: 'center',
    color: 'black',
    background: '#ffffff',
    backdropFilter: 'blur(10px)',
    borderRadius: 12,
    marginBottom: 15,
    border: `1px solid ${alpha('#ffffff', 0.2)}`,
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
    },
});

const GradientButton = styled(Button)(({ theme }) => ({
    background: 'black',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
    padding: '12px 24px',
    margin: '8px',
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: '#333',
        transform: 'translateY(-1px)',
    },
    '&.secondary': {
        background: 'white',
        color: 'black',
        border: '1px solid black',
        '&:hover': {
            background: '#f5f5f5',
        },
    },
}));

const StyledTextField = styled(TextField)({
    marginBottom: 20,
    '& label': {
        color: 'black',
        fontSize: 18,
    },
    '& label.Mui-focused': {
        color: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
            borderRadius: 8,
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
        '& input': {
            color: 'black',
            fontSize: 16,
            padding: '14px',
        },
    },
});

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [disableRegister, setDisableRegister] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('https://ipinfo.io/json?token=5a17bbfded96f7')
            .then(response => response.json())
            .then(data => {
                setCountry(data.country);
            });
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setDisableRegister(true);
        const { user, error } = await registerUser({ email, password, phoneNumber, username, country });
        setDisableRegister(false);
        if (user) {
            router.push('/');
        } else {
            console.error(error);
        }
    };

    // 4) New function: Register/Sign In with Google
    const handleGoogleSignIn = async () => {
        try {
            setDisableRegister(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            // If successful, you get a user object
            if (result.user) {
                const idToken = await result.user.getIdToken();
                const { user, error } = await registerUserGoogle({ idToken: idToken, country });
                setDisableRegister(false);
                if (user) {
                    router.push('/');
                } else {
                    console.error(error);
                }
            }
        } catch (error) {
            setDisableRegister(false);
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "40px 20px",
            }}
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <GlassCard sx={{ width: '380px', maxWidth: '100%', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' }}>
                    <CardContent>
                        <Typography
                            variant="h4"
                            sx={{
                                marginBottom: 3,
                                fontWeight: 600,
                                fontSize: '2rem'
                            }}
                        >
                            Crear una cuenta
                        </Typography>

                        <form onSubmit={handleRegister}>
                            <StyledTextField
                                label="Usuario"
                                name="name"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                            />
                            <StyledTextField
                                label="Teléfono"
                                name="phone"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                            />
                            <StyledTextField
                                label="Correo electrónico"
                                name="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                            />
                            <StyledTextField
                                label="Contraseña"
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                            />

                            <GradientButton
                                type="submit"
                                variant="contained"
                                disabled={disableRegister}
                                fullWidth
                            >
                                Crear Cuenta
                            </GradientButton>
                        </form>

                        {/* 5) New button: Sign in with Google */}
                        <GradientButton
                            variant="contained"
                            onClick={handleGoogleSignIn}
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            Crear Cuenta Con Google
                        </GradientButton>

                        <Divider sx={{ my: 3 }}>
                            <Typography color="textSecondary">o</Typography>
                        </Divider>

                        <Link href="/login" style={{ textDecoration: 'none' }}>
                            <GradientButton
                                className="secondary"
                                fullWidth
                            >
                                Ya tengo una cuenta
                            </GradientButton>
                        </Link>
                    </CardContent>
                </GlassCard>
            </Box>

            <GlassCard
                sx={{
                    maxWidth: '380px',
                    margin: '0 auto',
                    marginTop: 4,
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                }}
            >
                <img
                    src="https://chicagocarhelp.s3.us-east-2.amazonaws.com/Quinielas+(1).png"
                    alt="logo"
                    style={{
                        width: 45,
                        height: "auto"
                    }}
                />
                <Typography
                    sx={{
                        fontSize: '14px',
                        color: 'rgba(0, 0, 0, 0.8)'
                    }}
                >
                    © 2025 - Todos los Derechos Reservados LIGA MX.
                    Quiniela liga mx 2025.
                </Typography>
            </GlassCard>
        </Box>
    );
};

export default RegisterPage;
