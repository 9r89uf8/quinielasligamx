// Components/Buy.js
'use client';

import React, { Fragment, useState, useEffect } from "react";
import { useStore } from '@/app/store/store';
import { createQuiniela } from '@/app/services/quinielasService';
import { fetchLatestJornada } from "@/app/services/jornadaService";
import { useRouter } from 'next/navigation';
import CartComp from "@/app/components/cart/CartComp";
import { useRealtimeCart } from "@/app/components/hooks/UseRealtimeCart";
import {
    FormControl,
    InputLabel,
    Grid,
    Button,
    MenuItem,
    Select,
    Typography,
    Box,
    Paper,
    Tooltip,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import InfoIcon from '@mui/icons-material/Info';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    background: '#fdfffc',
    marginTop: theme.spacing(2),
}));

const StyledText = styled(Typography)(({ theme }) => ({
    background: '#11468F',
    color: 'white',
    padding: theme.spacing(0.5),
    fontSize: 18,
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    lineHeight: '1.2'
}));

const GameDateTime = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '1.1rem',
    textAlign: 'center',
    marginTop: theme.spacing(1),
}));

const LeagueLabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '1rem',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: theme.spacing(1),
}));

const Buy = () => {
    const jornada = useStore((state) => state.buyJornada);
    const user = useStore((state) => state.user);
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);


    useEffect(() => {
        const getLatestJornada = async () => {
            if (!jornada) {
                const latestJornada = await fetchLatestJornada();
                const initialGames = {};
                latestJornada.active.games.forEach((game, index) => {
                    initialGames[index] = {
                        gameId: game.gameId,
                        team1: { fullName: game.team1.fullName, logo: game.team1.logo, guess: '' },
                        team2: { fullName: game.team2.fullName, logo: game.team2.logo, guess: '' },
                        guess: '',
                        gameDate: game.gameDate,
                        league: game.league
                    };
                });
                setFormData(initialGames);
            } else {
                if (jornada && jornada.games) {
                    const initialGames = {};
                    jornada.games.forEach((game, index) => {
                        initialGames[index] = {
                            gameId: game.gameId,
                            team1: { fullName: game.team1.fullName, logo: game.team1.logo, guess: '' },
                            team2: { fullName: game.team2.fullName, logo: game.team2.logo, guess: '' },
                            guess: '',
                            gameDate: game.gameDate,
                            league: game.league
                        };
                    });
                    setFormData(initialGames);
                }
            }
        };

        getLatestJornada();
    }, [jornada]);

    // Add real-time chat subscription
    useRealtimeCart({
        userId: user?.uid
    });

    const onChange = (e, index) => {
        const newGuess = e.target.value;
        setFormData(prevFormData => ({
            ...prevFormData,
            [index]: {
                ...prevFormData[index],
                guess: newGuess
            }
        }));
    };

    const handleRegisterClick = () => {
        router.push('/register');
    };

    const handleBuyClick = (e) => {
        e.preventDefault()
        if (!user) {
            setShowRegisterPrompt(true);
        } else {
            onSubmit(e);
        }
    };

    const onSubmit = async (e) => {
        e && e.preventDefault();

        const formattedData = Object.keys(formData).map(game => {
            const gameData = formData[game];
            return {
                gameId: gameData.gameId,
                team1: { fullName: gameData.team1.fullName, logo: gameData.team1.logo, score: '-' },
                team2: { fullName: gameData.team2.fullName, logo: gameData.team2.logo, score: '-' },
                guess: gameData.guess,
                result: '',
                gamePlayed: false,
                gameCancelled: false,
                correct: false,
                gameDate: gameData.gameDate,
                league: gameData.league
            };
        });

        await createQuiniela({ games: formattedData, user: user, jornada: jornada });
        // router.push('/cart');
        // Reset all form fields
        const resetGames = {};
        Object.keys(formData).forEach(index => {
            resetGames[index] = {
                ...formData[index],
                guess: ''
            };
        });
        setFormData(resetGames);

        // Scroll to top of the page smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const formatGameDate = (dateString) => {
        // e.g. dateString = "2025-01-08"
        const [year, month, day] = dateString.split('-').map(Number);

        // Note: months are zero-based in JS
        const date = new Date(year, month - 1, day);

        return date.toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


    const getResultLabel = (value) => {
        switch (value) {
            case 'L':
                return 'Local Gana';
            case 'E':
                return 'Empate';
            case 'V':
                return 'Visitante Gana';
            default:
                return value;
        }
    };

    let list;
    if (jornada && jornada.games) {
        list = jornada.games.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
                <Paper elevation={3} style={{ padding: '20px', margin: '5px' }}>
                    <LeagueLabel>
                        <SportsSoccerIcon />
                        {item.league}
                        <Tooltip title="Liga oficial" placement="top">
                            <InfoIcon fontSize="small" />
                        </Tooltip>
                    </LeagueLabel>

                    <GameDateTime>
                        {formatGameDate(item.gameDate)}
                    </GameDateTime>

                    <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ marginTop: '10px' }}>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id={`select-outcome-${index}`}>
                                    Selecciona el Resultado
                                </InputLabel>
                                <Select
                                    labelId={`select-outcome-${index}`}
                                    id={`select-outcome-${item.gameName}`}
                                    value={formData[index]?.guess || ''}
                                    name={item.gameName}
                                    onChange={e => onChange(e, index)}
                                    required
                                    label="Selecciona el Resultado"
                                >
                                    <MenuItem value="L">
                                        <Box>
                                            <Typography variant="h6">{item.team1.fullName} Gana - L</Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="E">
                                        <Box>
                                            <Typography variant="h6">Empate - E</Typography>
                                            <Typography variant="h6" color="textSecondary">
                                                Nadie gana
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="V">
                                        <Box>
                                            <Typography variant="h6">{item.team2.fullName} Gana - V</Typography>
                                        </Box>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center', marginBottom: -80 }}>
                            <h4>vs</h4>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                            <img src={item.team1.logo} alt={item.team1.name} style={{ width: '60px', marginBottom: '10px' }} />
                            <StyledText>{item.team1.fullName}</StyledText>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                            <img src={item.team2.logo} alt={item.team2.name} style={{ width: '60px', marginBottom: '10px' }} />
                            <StyledText>{item.team2.fullName}</StyledText>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        ));
    }

    if (jornada && jornada.openToBuy) {
        return (
            <Fragment>
                <Box sx={{ marginBottom: 7}}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={11}>
                            <CartComp/>
                            <Item elevation={6}>
                                <form onSubmit={handleBuyClick}>
                                    <Grid container spacing={1} justifyContent="center">
                                        {list}
                                    </Grid>
                                    <Box textAlign="center">
                                        <Button
                                            style={{marginTop: 20}}
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            disabled={showRegisterPrompt}
                                        >
                                            Comprar Quiniela
                                        </Button>
                                    </Box>
                                </form>
                            </Item>
                        </Grid>
                    </Grid>


                    {showRegisterPrompt && (
                        <Box mt={2} textAlign="center">
                            <Typography variant="h6" color="error">
                                Por favor regístrate antes de comprar una quiniela.
                            </Typography>
                            <Button variant="contained" color="primary" onClick={handleRegisterClick}>
                                Registrate Aquí
                            </Button>
                        </Box>
                    )}
                </Box>
            </Fragment>
        );
    } else {
        return (
            <Box sx={{flexGrow: 1}} style={{minHeight: '100vh'}}>
                <Item elevation={6}>
                    <Typography variant="h5" component="div" style={{textAlign: 'center', fontWeight: 'bold'}}>
                        No hay Quinielas a la venta por el momento.
                    </Typography>
                </Item>
            </Box>
        );
    }
};

export default Buy;


