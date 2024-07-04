'use client';
import React, {Fragment, useState, useEffect} from "react";
import { useStore } from '@/app/store/store';
// material ui imports for styling
import FormControl from "@mui/material/FormControl";
import {updateJornadaScore} from "@/app/services/jornadaService";
import { FormControlLabel, Checkbox } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import Badge from '@mui/material/Badge';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from "@mui/material/Divider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: 15,
    color: theme.palette.text.secondary,
    background: '#fdfffc',
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
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

const UpdateJornadaScore = () => {
    const jornada = useStore((state) => state.jornada);
    const loading = useStore((state) => state.loadingJornada);
    const user = useStore((state) => state.user);

    let initialGames = {};

    if (jornada&&jornada.games) {
        jornada.games.forEach((game, index) => {
            initialGames[index] = {
                gameId: game.gameId,
                team1: { name: game.team1.name, logo: game.team1.logo, score: game.team1.score },
                team2: { name: game.team2.name, logo: game.team2.logo, score: game.team2.score },
                result: game.result,
                gamePlayed: game.gamePlayed,
                gameCancelled: game.gameCancelled,
            };
        });
    }


    const [formData, setFormData] = useState(initialGames);


    const onChange = (e, index, field) => {
        const { value, checked, type } = e.target;

        // Check if the field includes 'score' to handle nested state updates for team scores
        if (field.includes('score')) {
            const team = field.split('.')[0]; // 'team1' or 'team2'
            setFormData(prevFormData => ({
                ...prevFormData,
                [index]: {
                    ...prevFormData[index],
                    [team]: { // 'team1' or 'team2'
                        ...prevFormData[index][team],
                        score: type === 'checkbox' ? checked : value // Update score
                    }
                }
            }));
        } else {
            // For other fields that are not nested
            setFormData(prevFormData => ({
                ...prevFormData,
                [index]: {
                    ...prevFormData[index],
                    [field]: type === 'checkbox' ? checked : value
                }
            }));
        }
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        // Here you would format formData as needed and dispatch your action
        await updateJornadaScore({jornada: jornada, games: formData})
        // dispatch(addQuiniela({games: Object.values(formData), user: user, jornada: jornada}))
        // navigate('/buy')
    };

    let list;
    if(jornada&&jornada.games){
        list = Object.keys(formData).map((index) => (
            <Fragment key={index}>
                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={formData[index].team1.logo} alt={formData[index].team1.name} style={{ width: '30px', marginRight: '10px' }} />
                        <StyledText>{formData[index].team1.name}</StyledText>
                        <TextField
                            label="Team 1 Score"
                            variant="outlined"
                            size="small"
                            value={formData[index].team1.score}
                            onChange={(e) => onChange(e, index, 'team1.score')}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TextField
                            label="Team 2 Score"
                            variant="outlined"
                            size="small"
                            value={formData[index].team2.score}
                            onChange={(e) => onChange(e, index, 'team2.score')}
                        />
                        <StyledText>{formData[index].team2.name}</StyledText>
                        <img src={formData[index].team2.logo} alt={formData[index].team2.name} style={{ width: '30px', marginLeft: '10px' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Result</InputLabel>
                            <Select
                                value={formData[index].result}
                                onChange={(e) => onChange(e, index, 'result')}
                                label="Result"
                            >
                                <MenuItem value="L">L</MenuItem>
                                <MenuItem value="V">V</MenuItem>
                                <MenuItem value="E">E</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData[index].gamePlayed}
                                    onChange={(e) => onChange(e, index, 'gamePlayed')}
                                />
                            }
                            label="Game Played"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData[index].gameCancelled}
                                    onChange={(e) => onChange(e, index, 'gameCancelled')}
                                />
                            }
                            label="Game Cancelled"
                        />
                    </Grid>
            </Fragment>
        ));
    }




    return (
        <Box sx={{ flexGrow: 1 }} style={{minHeight: '100vh'}}>
            <form onSubmit={onSubmit} style={{marginTop: 14}}>
                <Grid container spacing={2} justifyContent="center">
                    {jornada&&list}
                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button style={{margin: 5, background: "whitesmoke", color: "black"}} type="submit" variant="contained" disabled={loading}>Update Scores</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default UpdateJornadaScore;