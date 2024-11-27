// components/Buy.js
'use client';

import React, { Fragment, useState, useEffect } from "react";
import { useStore } from '@/app/store/store';
import { createQuiniela } from '@/app/services/quinielasService';
import {fetchLatestJornada} from "@/app/services/jornadaService";
import { useRouter } from 'next/navigation';
import CartComp from "@/app/components/cart/CartComp";
import {useRealtimeCart} from "@/app/components/hooks/UseRealtimeCart";
// Material UI imports for styling
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
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

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
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    background: "linear-gradient(45deg, #0077b6 30%, #023e8a 90%)",
    color: theme.palette.common.white,
    margin: theme.spacing(1, 0),
    boxShadow: theme.shadows[3],
    '&:before': {
        backgroundColor: 'transparent',
    },
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
                        team1: { name: game.team1.name, logo: game.team1.logo, guess: '' },
                        team2: { name: game.team2.name, logo: game.team2.logo, guess: '' },
                        guess: ''
                    };
                });
                setFormData(initialGames);
            } else {
                if (jornada && jornada.games) {
                    const initialGames = {};
                    jornada.games.forEach((game, index) => {
                        initialGames[index] = {
                            gameId: game.gameId,
                            team1: { name: game.team1.name, logo: game.team1.logo, guess: '' },
                            team2: { name: game.team2.name, logo: game.team2.logo, guess: '' },
                            guess: ''
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
                team1: { name: gameData.team1.name, logo: gameData.team1.logo, score: '-' },
                team2: { name: gameData.team2.name, logo: gameData.team2.logo, score: '-' },
                guess: gameData.guess,
                result: '',
                gamePlayed: false,
                gameCancelled: false,
                correct: false
            };
        });

        await createQuiniela({ games: formattedData, user: user, jornada: jornada });
        // router.push('/cart');
    };

    let list;
    if (jornada && jornada.games) {
        list = jornada.games.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
                <Paper elevation={3} style={{ padding: '5px', margin: '5px' }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={4} style={{ textAlign: 'center' }}>
                            <img src={item.team1.logo} alt={item.team1.name} style={{ width: '60px', marginBottom: '10px' }} />
                            <StyledText>{item.team1.name}</StyledText>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                {(!formData[index]?.guess || formData[index].guess === 'DEFAULT_VALUE') && (
                                    <InputLabel id={`select-outcome-${index}`} sx={{ fontSize: '1.25rem' }}>Elige</InputLabel>
                                )}
                                <Select
                                    labelId={`select-outcome-${index}`}
                                    id={`select-outcome-${item.gameName}`}
                                    value={formData[index]?.guess || ''}
                                    name={item.gameName}
                                    onChange={e => onChange(e, index)}
                                    required
                                    sx={{ fontSize: '1.5rem' }}
                                    label={!formData[index]?.guess || formData[index]?.guess === 'DEFAULT_VALUE' ? 'Elige' : ''}
                                >
                                    <MenuItem value="L" sx={{ fontSize: '1.5rem' }}>L</MenuItem>
                                    <MenuItem value="E" sx={{ fontSize: '1.5rem' }}>E</MenuItem>
                                    <MenuItem value="V" sx={{ fontSize: '1.5rem' }}>V</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} style={{ textAlign: 'center' }}>
                            <img src={item.team2.logo} alt={item.team2.name} style={{ width: '60px', marginBottom: '10px' }} />
                            <StyledText>{item.team2.name}</StyledText>
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


