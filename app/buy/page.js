// components/Buy.js
'use client';

import React, { Fragment, useState, useEffect } from "react";
import { useStore } from '@/app/store/store';
import {createQuiniela, fetchQuinielas, fetchUserQuinielasByJornadaId} from '@/app/services/quinielasService';
import { useRouter } from 'next/navigation';
// Material UI imports for styling
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import { Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import {fetchLatestJornada} from "@/app/services/jornadaService";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: 15,
    color: theme.palette.text.secondary,
    background: '#fdfffc'
}));

const StyledText = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    background: '#11468F',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
    color: 'white',
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    background: "linear-gradient(45deg, #0077b6 30%, #023e8a 90%)",
    color: theme.palette.common.white,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    '&:before': {
        backgroundColor: 'transparent',
    },
}));

const Buy = () => {
    const jornada = useStore((state) => state.buyJornada);
    const user = useStore((state) => state.user);
    const router = useRouter();
    const addQuinielaAction = useStore((state) => state.addQuiniela);
    const [formData, setFormData] = useState({});

    useEffect(()  => {
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
            }else {
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

    const handleBuyClickR = () => {
        router.push('/register');
    };

    const onSubmit = async (e) => {
        e.preventDefault();

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
        addQuinielaAction({ games: formattedData, user: user, jornada: jornada });
        router.push('/buy');
    };

    let list;
    if (jornada && jornada.games) {
        list = jornada.games.map((item, index) => (
            <Fragment key={index}>
                <Grid item xs={4} sm={6} md={4} lg={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={item.team1.logo} alt={item.team1.name} style={{ width: '40px', marginRight: '10px' }} />
                    <StyledText>{item.team1.name}</StyledText>
                </Grid>

                <Grid item xs={4} sm={6} md={4} lg={3}>
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

                <Grid item xs={4} sm={6} md={4} lg={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <StyledText>{item.team2.name}</StyledText>
                    <img src={item.team2.logo} alt={item.team2.name} style={{ width: '40px', marginLeft: '10px' }} />
                </Grid>
            </Fragment>
        ));
    }

    if (jornada && jornada.openToBuy) {
        return (
            <Fragment>
                <Box sx={{ flexGrow: 1 }} style={{ minHeight: '100vh' }}>
                    <Item elevation={6}>
                        <Typography variant="h5" component="div" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Premio
                        </Typography>

                        <StyledAccordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ color: "white", fontSize: 43 }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h5" component="div" style={{ textAlign: 'center', fontWeight: 'bold' }}>${jornada.prize * 15} Pesos</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                                    <Box display="flex" flexDirection="column" alignItems="center" style={{ marginLeft: 8 }}>
                                        <Typography variant="h5" component="div" style={{ textAlign: 'center', marginBottom: 5 }}>
                                            Solo ganas si haces 9 puntos en 1 Quiniela
                                        </Typography>
                                        <Divider style={{ margin: 10 }}><SportsSoccerIcon /></Divider>
                                        <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                                            Si vives en México ganas ${jornada.prize * 15} Pesos
                                        </Typography>
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </StyledAccordion>

                        <StyledAccordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ color: "white", fontSize: 43 }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h5" component="div" style={{ textAlign: 'center', fontWeight: 'bold' }}>${jornada.prize} Dólares</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                                    <Box display="flex" flexDirection="column" alignItems="center" style={{ marginLeft: 8 }}>
                                        <Typography variant="h5" component="div" style={{ textAlign: 'center', marginBottom: 5 }}>
                                            Solo ganas si haces 9 puntos en 1 Quiniela
                                        </Typography>
                                        <Divider style={{ margin: 10 }}><SportsSoccerIcon /></Divider>
                                        <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                                            Si vives en USA ganas ${jornada.prize} Dólares
                                        </Typography>
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </StyledAccordion>
                    </Item>
                    <form onSubmit={onSubmit}>
                        <Item elevation={6}>
                            <Grid container spacing={2} justify="center" style={{ marginBottom: '10px' }}>
                                {list}
                            </Grid>
                            <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                                Comprar Quiniela
                            </Button>
                        </Item>
                    </form>
                </Box>
            </Fragment>
        );
    } else {
        return (
            <Box sx={{ flexGrow: 1 }} style={{ minHeight: '100vh' }}>
                <Item elevation={6}>
                    <Badge badgeContent={<CancelIcon color="secondary" />} color="error" style={{ marginBottom: '30px' }}>
                        <Typography variant="h5" component="div" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            No hay Quinielas a la venta por el momento.
                        </Typography>
                    </Badge>
                    <Button onClick={handleBuyClickR} variant="contained" color="primary" fullWidth size="large">
                        Regístrate para recibir notificaciones
                    </Button>
                </Item>
            </Box>
        );
    }
};

export default Buy;

