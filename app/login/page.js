'use client'
import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    Paper,
    TextField,
    Typography,
    Link,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useStore } from '@/app/store/store';
import {loginUser, registerUserGoogle} from '@/app/services/authService';

// 1) Import GoogleAuthProvider and signInWithPopup
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// 2) Import your firebase auth object
import {auth} from "@/app/utils/firebaseClient";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#ffffff',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    background: 'black',
    color: 'white',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: theme.spacing(1),
    '&:hover': {
        background: '#333',
    },
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    '& label': {
        color: 'black',
        fontSize: '1rem',
    },
    '& label.Mui-focused': {
        color: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
        '& input': {
            color: 'black',
            fontSize: '1rem',
        }
    }
}));

const Footer = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(3),
    marginTop: 'auto',
    background: '#ffffff',
    borderRadius: theme.spacing(2)
}));

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const setUser = useStore((state) => state.setUser);

    const [country, setCountry] = useState('');
    useEffect(() => {
        fetch('https://ipinfo.io/json?token=5a17bbfded96f7')
            .then(response => response.json())
            .then(data => {
                setCountry(data.country);
            });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { user, error } = await loginUser(email, password, setUser);
        if (user) {
            router.push('/');
        }
    };

    const handleReset = () => {
        router.push('/reset-password');
    };

    const handleRegister = () => {
        router.push('/register');
    };

    // 4) New function: Register/Sign In with Google
    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            // If successful, you get a user object
            if (result.user) {
                const idToken = await result.user.getIdToken();
                const { user, error } = await registerUserGoogle({ idToken: idToken, country });

                if (user) {
                    router.push('/');
                } else {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                <StyledPaper elevation={4}>
                    <img
                        src="https://chicagocarhelp.s3.us-east-2.amazonaws.com/Quinielas+(1).png"
                        alt="logo"
                        style={{ width: 60, height: 'auto', marginBottom: 16 }}
                    />
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 500, marginBottom: 4, textAlign: 'center' }}>
                        Mi Cuenta
                    </Typography>

                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
                        <StyledTextField
                            fullWidth
                            required
                            label="Correo electrónico"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />

                        <StyledTextField
                            fullWidth
                            required
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />

                        <StyledButton type="submit">
                            Iniciar sesión
                        </StyledButton>

                        {/* 5) New button: Sign in with Google */}
                        <StyledButton
                            variant="contained"
                            onClick={handleGoogleSignIn}
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            Inicia sesión con Google
                        </StyledButton>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleReset}
                                    sx={{
                                        color: 'black',
                                        borderColor: 'black',
                                        '&:hover': {
                                            borderColor: 'black',
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                        },
                                    }}
                                >
                                    ¿Olvidaste tu contraseña?
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleRegister}
                                    sx={{
                                        color: 'black',
                                        borderColor: 'black',
                                        '&:hover': {
                                            borderColor: 'black',
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                        },
                                    }}
                                >
                                    Crear cuenta
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </StyledPaper>
            </Container>

            <Container maxWidth="sm">
                <Footer>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                        © 2025 - Todos los Derechos Reservados LIGA MX
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Quiniela liga mx 2025
                    </Typography>
                </Footer>
            </Container>

        </Box>
    );
};

export default LoginPage;

