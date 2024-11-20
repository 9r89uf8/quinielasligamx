// app/page.js
import React from 'react';
import Link from 'next/link';
import {
    Container,
    Box,
    Typography,
    Button,
    Paper,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import FantasyScoreList from "@/app/components/FantasyScoreList";
import HowToParticipate from '@/app/components/HowToParticipate';

const PrizeCard = ({ country, children }) => {
    let background;
    let flagColors;

    if (country === 'USA') {
        background = 'linear-gradient(45deg, #ffffff, #f8f9fa)';
        flagColors = ['#00509d', '#FFFFFF', '#d90429']; // Blue, White, Red stripes
    } else if (country === 'México') {
        background = 'linear-gradient(45deg, #ffffff, #f8f9fa)';
        flagColors = ['#006847', '#FFFFFF', '#CE1126']; // Green, White, Red stripes
    } else {
        background = '#f1f1f1';
        flagColors = [];
    }

    return (
        <Paper
            sx={{
                background,
                padding: 2.5,
                borderRadius: 2,
                boxShadow: 2,
                marginBottom: 2.5,
                textAlign: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Flag bar */}
            <Box
                sx={{
                    display: 'flex',
                    height: 10,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    overflow: 'hidden',
                }}
            >
                {flagColors.map((color, index) => (
                    <Box key={index} sx={{ flex: 1, backgroundColor: color }} />
                ))}
            </Box>

            {/* Content with some padding to avoid overlapping the flag bar */}
            <Box sx={{ mt: 2 }}>
                {children}
            </Box>
        </Paper>
    );
};

const GradientHeader = ({ children }) => (
    <Paper
        elevation={3}
        sx={{
            background: 'linear-gradient(135deg, #343a40, #212529)',
            padding: 5,
            borderRadius: 2,
            boxShadow: 4,
            textAlign: 'center',
            marginBottom: 4,
            position: 'relative',
        }}
    >
        {children}
    </Paper>
);

const MessageCard = ({ children }) => (
    <Paper
        sx={{
            background: '#ffffff',
            padding: 2.5,
            borderRadius: 2,
            boxShadow: 2,
            marginTop: 2.5,
            marginBottom: 2.5,
            textAlign: 'center',
        }}
    >
        {children}
    </Paper>
);

const teams = [
    { name: "CAZ", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/cruz.avif", size: '70px' },
    { name: "GDL", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/chivas.avif", size: '70px' },
    { name: "AME", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/america.avif", size: '70px' }
];

const fantasyScores = [
    { place: 1, user: "Carlos11S", gameName: "Jornada 17",gameYear: "Liga MX, 2024", points: 9, country: 'México', prize: '150,000', currency: 'pesos'},
    { place: 2, user: "Mario_Ro3", gameName: "Jornada 17", gameYear: "Liga MX, 2024", points: 9, country: 'Estados Unidos', prize: '10,000', currency: 'dólares'},
    { place: 3, user: "Juan Pérez", gameName: "Jornada 16", gameYear: "Liga MX, 2024", points: 9, country: 'México', prize: '150,000', currency: 'pesos'},
    { place: 4, user: "luisitoo2024", gameName: "Jornada 15", gameYear: "Liga MX, 2024", points: 9, country: 'México', prize: '150,000', currency: 'pesos'},
    { place: 5, user: "Luis Martínez", gameName: "Jornada 15", gameYear: "Liga MX, 2024", points: 9, country: 'Estados Unidos', prize: '10,000', currency: 'dólares'},
];

export default function HomePage() {
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(currentDate);

    return (
        <Box sx={{ bgcolor: '#f9fafb', minHeight: '100vh', py: 3, overflowX: 'hidden' }}>
            <Container maxWidth="md">
                <GradientHeader>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            color: 'common.white',
                            fontSize: {xs: '2.8rem', md: '4rem'},
                            fontWeight: 900,
                            mb: 2,
                        }}
                    >
                        Quiniela Liga MX 2025
                    </Typography>

                    {/*current year*/}
                    {/* Selectors inside a gradient box */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            background: 'linear-gradient(45deg, #36d1dc, #5b86e5)',
                            padding: 2,
                            borderRadius: 2,
                            mb: 3,
                        }}
                    >
                        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel sx={{ color: 'white' }}>Año</InputLabel>
                            <Select
                                defaultValue={2025}
                                label="Año"
                                sx={{
                                    color: 'white',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                    },
                                    '.MuiSvgIcon-root': {
                                        color: 'white',
                                    },
                                }}
                                inputProps={{
                                    sx: { color: 'white' },
                                }}
                            >
                                <MenuItem value={2023}>2023</MenuItem>
                                <MenuItem value={2024}>2024</MenuItem>
                                <MenuItem value={2025}>2025</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" sx={{ minWidth: 140 }}>
                            <InputLabel sx={{ color: 'white' }}>Jornada</InputLabel>
                            <Select
                                defaultValue={1}
                                label="Jornada"
                                sx={{
                                    color: 'white',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                    },
                                    '.MuiSvgIcon-root': {
                                        color: 'white',
                                    },
                                }}
                                inputProps={{
                                    sx: { color: 'white' },
                                }}
                            >
                                {Array.from({ length: 17 }, (_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                        Jornada {i + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Typography
                        variant="h4"
                        sx={{
                            color: 'common.white',
                            mb: 3,
                            fontSize: {xs: '1.5rem', md: '2rem'},
                            fontWeight: 'bold',
                        }}
                    >
                        ¡Pon a prueba tus conocimientos y gana en grande!
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: 'common.white',
                            mb: 4,
                            fontSize: {xs: '1.2rem', md: '1.5rem'},
                        }}
                    >
                        ¿Eres un experto en fútbol de la Liga BBVA MX y tienes un don para predecir los resultados?
                    </Typography>

                    <MessageCard>
                        <Typography variant="h5" gutterBottom>
                            ¿Tiene alguna pregunta?
                        </Typography>
                        <Button
                            component={Link}
                            href="/chat"
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(45deg, #36d1dc, #5b86e5)',
                                fontSize: '1.25rem',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                                '&:hover': {
                                    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            Mandar Mensaje
                        </Button>
                    </MessageCard>
                </GradientHeader>

                {/* Team Logos Section */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        mb: 2,
                    }}
                >
                    {teams.map((team, index) => (
                        <Box
                            key={index}
                            sx={{
                                textAlign: 'center',
                                mx: 2,
                                my: 1,
                            }}
                        >
                            <img
                                src={team.logo}
                                alt={team.name}
                                style={{
                                    width: team.size,
                                    height: team.size,
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    ))}
                </Box>

                {/* PrizeCards with Dividers */}
                <PrizeCard country="USA">
                    <Typography variant="h5" gutterBottom>
                        Si vives en Estados Unidos ganas
                    </Typography>
                    <Divider sx={{my: 1}}/>
                    <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                            fontWeight: 700,
                            color: '#1e3c72',
                            mb: 1,
                        }}
                    >
                        $10,000
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{fontWeight: 500, color: '#1e3c72', mb: 2}}
                    >
                        dólares
                    </Typography>
                    <Divider sx={{my: 1}}/>
                    <Typography variant="h5" sx={{mb: 2}}>
                        1 quiniela cuesta $3 dólares
                    </Typography>
                    <Button
                        component={Link}
                        href="/buy"
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #343a40, #212529)',
                            fontSize: {xs: '1.1rem', md: '1.5rem'},
                            py: 1.5,
                            px: 3,
                            mt: 1,
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.7)',
                            '&:hover': {
                                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        Comprar Quiniela
                    </Button>
                </PrizeCard>

                <PrizeCard country="México">
                    <Typography variant="h5" gutterBottom>
                        Si vives en México ganas
                    </Typography>
                    <Divider sx={{my: 1}}/>
                    <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                            fontWeight: 700,
                            color: '#1e3c72',
                            mb: 1,
                        }}
                    >
                        $150,000
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{fontWeight: 500, color: '#1e3c72', mb: 2}}
                    >
                        pesos
                    </Typography>
                    <Divider sx={{my: 1}}/>
                    <Typography variant="h5" sx={{mb: 2}}>
                        1 quiniela cuesta $45 pesos
                    </Typography>
                    <Button
                        component={Link}
                        href="/buy"
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #343a40, #212529)',
                            fontSize: {xs: '1.1rem', md: '1.5rem'},
                            py: 1.5,
                            px: 3,
                            mt: 1,
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.7)',
                            '&:hover': {
                                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        Comprar Quiniela
                    </Button>
                </PrizeCard>

                <FantasyScoreList scores={fantasyScores} />

                <HowToParticipate />

                {/* Footer */}
                <Paper
                    elevation={3}
                    sx={{
                        textAlign: 'center',
                        p: 2.5,
                        mt: 5,
                        backgroundColor: '#ffffff',
                        marginBottom: 9,
                    }}
                >
                    <Typography variant="h6" color="text.secondary">
                        © 2025 - Todos los Derechos Reservados LIGA BBVA MX 2025. quinielaligamx.com.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}