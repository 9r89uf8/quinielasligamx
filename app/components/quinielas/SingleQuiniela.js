// components/SingleQuiniela.js
'use client';

import React from 'react';
import { Box, Button, Paper, Typography, Grid, Card, CardContent, CardActions, Chip, Avatar } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import FaceIcon from '@mui/icons-material/Face';
import { useStore } from '@/app/store/store';
import { deleteQuiniela } from '@/app/services/quinielasService';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: ' -5px auto 9px auto',
}));

const StyledCard = styled(Card)(({ theme }) => ({
    ...theme.typography.body2,
    background: 'linear-gradient(45deg, #f8f9fa 30%, #e9ecef 90%)',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
    margin: 'auto',
    marginBottom: 15,
}));

const StyledTextFour = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
    color: 'white',
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
    margin: '-10px auto 2px auto',
}));

const SingleQuiniela = ({ quiniela, index, showDelete, showScore }) => {
    const removeQuiniela = useStore((state) => state.removeQuiniela);

    const handleDelete = async (id) => {
        await deleteQuiniela(id);
        removeQuiniela(id);
    };

    const list = quiniela.games.map((item, index) => (
        <Grid key={index} container spacing={1} justifyContent="center">
            <Grid item sm={4} lg={11} xs={9}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={12} sm={12}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            margin: '5px auto',
                            padding: '10px', // Added padding for some spacing inside
                            borderRadius: '8px', // Optional: adds rounded corners for a modern look
                            background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)', // Example dark gradient
                            color: '#FFFFFF', // Ensures text is readable against the dark background
                            maxWidth: '960px', // Adjust as needed
                            width: '100%' // Ensures the div takes up the appropriate width
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={item.team1.logo} alt={item.team1.name} style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                <span style={{ fontSize: 18 }}>{item.team1.name}</span>
                            </div>
                            {item.gameCancelled ?
                                <div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>
                                    Cancelado
                                </div>
                                :
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span>{item.team1.score}</span>
                                    </div>
                                    <span>vs</span>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span>{item.team2.score}</span>
                                    </div>
                                </>
                            }

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontSize: 18 }}>{item.team2.name}</span>
                                <img src={item.team2.logo} alt={item.team2.name} style={{ width: '30px', height: '30px', marginLeft: '8px' }} />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item sm={1} lg={11} xs={3}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item sm={4} lg={11} xs={6}>
                        <div style={{
                            textAlign: 'center', // Centers the text inside the div
                            margin: 5,
                            padding: '10px',
                            borderRadius: '8px',
                            background: item.correct ? 'linear-gradient(to right, #0096c7, #0077b6, #023e8a)' : !item.correct && item.gamePlayed ? 'linear-gradient(to right, #f48c06, #e85d04, #dc2f02)' : 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                            color: '#f6f0f0',
                            maxWidth: '960px',
                            width: '100%'
                        }}>
                            {item.guess}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ));

    return (
        <Grid item xs={12} sm={6} key={index} style={{ position: 'relative' }}>
            <StyledCard>
                <CardContent>
                    <Item>
                        <Grid container spacing={1} justifyContent="center">
                            <Grid item>
                                <Chip icon={<FaceIcon />} label={quiniela.userName} style={{ margin: '2px 0px 2px 0px' }} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component="div" gutterBottom style={{ margin: '2px 0px 2px 0px' }}>
                                    Jornada {quiniela.jornadaNum}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Item>
                    {list}
                </CardContent>
                <CardActions style={{ justifyContent: 'center', display: 'flex' }}>
                    {showScore && quiniela.quinielaStarted ?
                        <StyledTextFour>Puntos: {quiniela.correctAmount}</StyledTextFour>
                        : null}
                    {showDelete ?
                        <Button onClick={() => handleDelete(quiniela.id)} variant="contained" color="warning">Borrar</Button>
                        : null}
                </CardActions>
            </StyledCard>
        </Grid>
    );
};

export default SingleQuiniela;
