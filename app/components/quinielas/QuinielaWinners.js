'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/app/store/store';
import { fetchQuinielasWinners } from '@/app/services/quinielasService';
import {
    Box,
    Typography,
    styled,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    FormControl, Select, MenuItem, Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #f8f9fa, #e9ecef)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    color: 'black',
    cursor: 'pointer',
    padding: '6px 16px',
    fontSize: '0.985rem',
    margin: '30px auto -5px auto',
    lineHeight: '1.5',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
    '&.selected': {
        background: 'rgba(255, 255, 255, 0.5)',
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    margin: '10px auto 30px auto',
}));

const WinnerBox = styled(Accordion)(({ theme }) => ({
    background: "linear-gradient(45deg, #161a1d 30%, #0b090a 90%)",
    color: 'white',
    boxShadow: theme.shadows[1],
    margin: theme.spacing(1, 0),
}));

const ScrollableContainer = styled('div')(({ theme }) => ({
    maxHeight: '400px',
    overflowY: 'auto',
    padding: theme.spacing(1),
}));

const QuinielaWinners = () => {
    const [visible, setVisible] = useState(3);
    const [currentJornadaId, setCurrentJornadaId] = useState('');
    const [attemptedCurrentJornada, setAttemptedCurrentJornada] = useState(false);

    const winners = useStore((state) => state.winners);
    const jornadas = useStore((state) => state.jornadas);
    const jornada = useStore((state) => state.jornada);


    const showMoreItems = () => {
        setVisible((prevState) => prevState + 2);
    };

    useEffect(() => {
        if (jornada && jornada.id) {
            setCurrentJornadaId(jornada.id);
            setAttemptedCurrentJornada(false);
        }
    }, [jornada]);

    useEffect(() => {
        if (!currentJornadaId || attemptedCurrentJornada) return;

        const fetchWinners = async () => {
            const winnersData = await fetchQuinielasWinners({ id: currentJornadaId });
            setAttemptedCurrentJornada(true);
        };

        fetchWinners();
    }, [currentJornadaId, attemptedCurrentJornada]);

    useEffect(() => {
        if (winners&&winners.length === 0 && attemptedCurrentJornada && jornadas && jornadas.length > 1) {
            const previousJornadaId = jornadas[1].id;
            setCurrentJornadaId(previousJornadaId);
            setAttemptedCurrentJornada(false);
        }
    }, [winners, attemptedCurrentJornada, jornadas]);

    const handleChange = async (event) => {
        const selectedJornadaId = event.target.value;
        setCurrentJornadaId(selectedJornadaId);

        const winnersData = await fetchQuinielasWinners({ id: selectedJornadaId });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Item elevation={6}>
                <MilitaryTechIcon sx={{ color: '#3d52d5', margin: '8px auto' }} />
                <Typography variant="h5" component="div" gutterBottom style={{ color: 'blue' }}>
                    {winners&&winners.length} ganadores de la Jornada
                </Typography>
                <FormControl>
                    {jornadas&&currentJornadaId && (
                        <Select
                            displayEmpty
                            value={currentJornadaId}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'Without label' }}
                            id="demo-simple-select"
                            sx={{ fontSize: '1.25rem' }}
                        >
                            {jornadas.map((jornada) => (
                                <MenuItem key={jornada.id} value={jornada.id} sx={{ fontSize: '1.5rem' }}>
                                    {jornada.jornadaNum}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </FormControl>

                <ScrollableContainer>
                    {winners && winners.slice(0, visible).map((item, index) => (
                        <WinnerBox key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
                                <Typography variant="h6"><b>{item.user}</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={4} md={3} lg={3}>
                                        <Typography variant="body1" component="div">Jornada</Typography>
                                        <Typography variant="h5" component="div">{item.jornadaNum}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={12} md={3} lg={3}>
                                        <Typography variant="body1" component="div">Puntos</Typography>
                                        <Typography variant="h6" component="div">{item.correctAmount} Pts</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={3} lg={3}>
                                        <Typography variant="body1" component="div">Premio</Typography>
                                        <Typography variant="h6" component="div">${item.prize * 17} MXN</Typography>
                                        <Typography variant="h6" component="div">${item.prize} USD</Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </WinnerBox>
                    ))}
                </ScrollableContainer>
                {winners && winners.length > visible && (
                    <div style={{ textAlign: "center" }}>
                        <GradientButton type="submit" variant="contained" onClick={showMoreItems}>
                            Mostrar más
                        </GradientButton>
                    </div>
                )}
            </Item>
        </Box>
    );
};

export default QuinielaWinners;
