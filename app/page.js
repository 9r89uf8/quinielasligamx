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
import PrizeDisplay from "@/app/components/PrizeDisplay";

const PrizeCard = ({ country, children }) => {
    let flagColors;

    if (country === 'USA') {
        flagColors = ['#00509d', '#FFFFFF', '#d90429']; // Blue, White, Red stripes
    } else if (country === 'México') {
        flagColors = ['#006847', '#FFFFFF', '#CE1126']; // Green, White, Red stripes
    } else {
        flagColors = [];
    }

    return (
        <Paper
            sx={{
                background: 'linear-gradient(135deg, #343a40, #212529)', // Dark background
                border: '8px solid #343a40', // Gold border
                padding: 2,
                borderRadius: 2,
                marginBottom: 5.5,
                textAlign: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
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
            background: 'linear-gradient(135deg, #f8f9fa, #dee2e6)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: 2,
            borderRadius: 2,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            marginBottom: 4,
            position: 'relative',
            width: '100%',
        }}
    >
        {children}
    </Paper>
);





const MessageCard = ({ children }) => (
    <Paper
        sx={{
            background: 'linear-gradient(135deg, #e9ecef, #dee2e6)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            padding: 2.5,
            borderRadius: 2,
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
    { place: 1, user: "Carlos11S", date: "12 de Enero, 2025",gameYear: "Liga MX, 2024", points: 10, country: 'MX', prize: '150,000', currency: 'pesos'},
    { place: 2, user: "Mario_Ro3", date: "12 de Enero, 2025", gameYear: "Liga MX, 2024", points: 10, country: 'US', prize: '10,000', currency: 'dólares'},
    { place: 3, user: "Juan Pérez", date: "12 de Enero, 2025", gameYear: "Liga MX, 2024", points: 10, country: 'MX', prize: '150,000', currency: 'pesos'},
    { place: 4, user: "luisitoo2024", date: "12 de Enero, 2025", gameYear: "Liga MX, 2024", points: 10, country: 'MX', prize: '150,000', currency: 'pesos'},
    { place: 5, user: "Luis Martínez", date: "12 de Enero, 2025", gameYear: "Liga MX, 2024", points: 10, country: 'US', prize: '10,000', currency: 'dólares'},
];

export default function HomePage() {
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(currentDate);

    return (
        <Box sx={{ minHeight: '100vh', py: 3, overflowX: 'hidden' }}>
            <Container maxWidth="md">
                <PrizeDisplay/>
                <GradientHeader>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            color: '#222222',
                            fontSize: {xs: '2.8rem', md: '4rem'},
                            fontWeight: 900,
                            mb: 2,
                        }}
                    >
                        Quiniela Liga MX 2025
                    </Typography>

                    {/* Selectors inside a gradient box */}
                    <Box
                        sx={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #e9ecef, #dee2e6)',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                            padding: 3,
                            borderRadius: 2,
                            mb: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mx: 0,
                        }}
                    >
                        {/* Row for the selectors */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                                width: '100%', // Make this box full width too
                            }}
                        >
                            {/* Year Selector */}
                            <FormControl variant="outlined" sx={{minWidth: 120}}>
                                <InputLabel sx={{color: 'black'}}>Año</InputLabel>
                                <Select
                                    defaultValue={2025}
                                    label="Año"
                                    sx={{
                                        color: 'black',
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'black',
                                        },
                                        '.MuiSvgIcon-root': {
                                            color: 'black',
                                        },
                                    }}
                                    inputProps={{
                                        sx: {color: 'black'},
                                    }}
                                >
                                    <MenuItem value={2023}>2023</MenuItem>
                                    <MenuItem value={2024}>2024</MenuItem>
                                    <MenuItem value={2025}>2025</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Jornada Selector */}
                            <FormControl variant="outlined" sx={{minWidth: 140}}>
                                <InputLabel sx={{color: 'black'}}>Jornada</InputLabel>
                                <Select
                                    defaultValue={2}
                                    label="Jornada"
                                    sx={{
                                        color: 'black',
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'black',
                                        },
                                        '.MuiSvgIcon-root': {
                                            color: 'black',
                                        },
                                    }}
                                    inputProps={{
                                        sx: {color: 'black'},
                                    }}
                                >
                                    {Array.from({length: 17}, (_, i) => (
                                        <MenuItem key={i + 1} value={i + 1}>
                                            Jornada {i + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Centered Current Date */}
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#343a40',
                                mt: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            16 de Enero, 2025
                        </Typography>
                    </Box>


                    <Typography
                        variant="h4"
                        sx={{
                            color: '#3a3a3a',
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
                            color: '#3a3a3a',
                            mb: 4,
                            fontSize: {xs: '1.2rem', md: '1.5rem'},
                        }}
                    >
                        ¿Eres un experto en fútbol de la Liga BBVA MX y tienes un don para predecir los resultados?
                    </Typography>
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

                <FantasyScoreList scores={fantasyScores}/>

                <HowToParticipate/>

                {/* Footer */}
                <Paper
                    elevation={3}
                    sx={{
                        background: 'linear-gradient(135deg, #f8f9fa, #dee2e6)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        p: 2.5,
                        mt: 5,
                        marginBottom: 9,
                    }}
                >
                    <Typography variant="h6" sx={{color: 'black'}}>
                        © 2025 - Todos los Derechos Reservados LIGA BBVA MX 2025. quinielaligamx.com.
                    </Typography>
                </Paper>

            </Container>
        </Box>
    );
}