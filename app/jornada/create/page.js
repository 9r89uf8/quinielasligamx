'use client';
import React, {Fragment, useState} from "react";

import TeamSelectComponent from "@/app/components/jornada/TeamSelectComponent";
import GameListComponent from "@/app/components/jornada/GameListComponent";

// material ui imports for styling
import FormControl from "@mui/material/FormControl";
import { Select, MenuItem } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import {addJornada} from "@/app/services/jornadaService";
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 60,
    paddingBottom: 8
}));


const CreateJornada = () => {

    // Add state to manage selected teams
    const [selectedTeam1, setSelectedTeam1] = useState('');
    const [selectedTeam2, setSelectedTeam2] = useState('');

// Handle change for the team select dropdowns
    const handleChangeTeam1 = (event) => {
        setSelectedTeam1(event.target.value);
    };

    const handleChangeTeam2 = (event) => {
        setSelectedTeam2(event.target.value);
    };

    const [text, setText] = useState();
    const [form, setForm] = useState({
        jornadaNum: '',
        prize: '1000',
        startDate: '',
        endDate: '',
        price: ''

    });

    const {jornadaNum, prize, startDate, endDate, price} = form

    //make a copy of the current state, get the name from input name = input value
    const onChangeNum = e =>
        setForm({ ...form, [e.target.name]: e.target.value });


    const [theGames, setTheGames] = useState([]);

    // Add state for league and date for current game
    const [currentGameLeague, setCurrentGameLeague] = useState('');
    const [currentGameDate, setCurrentGameDate] = useState('');

    // Modify addEntryClick to include league and date
    const addEntryClick = () => {
        if(selectedTeam1 && selectedTeam2 && currentGameLeague && currentGameDate) {
            setTheGames([...theGames, {
                team1: {
                    shortName: selectedTeam1.shortName,
                    fullName: selectedTeam1.fullName,
                    logo: selectedTeam1.logo
                },
                team2: {
                    shortName: selectedTeam2.shortName,
                    fullName: selectedTeam2.fullName,
                    logo: selectedTeam2.logo
                },
                league: currentGameLeague,
                gameDate: currentGameDate,
                result: ''
            }]);
            // Reset form after adding game
            setSelectedTeam1('');
            setSelectedTeam2('');
            // setCurrentGameLeague('');
            // setCurrentGameDate('');
        }
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        await addJornada({user: 'admin', games: theGames, jornadaNum: jornadaNum, prize: prize, startDate: startDate, endDate: endDate, price: price});
    };

    // if(isAuthenticated&&user._id!=='61f1ef1d013ddaaef0266b9c'){
    //     return <Redirect to="/" />;
    // }



    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }} style={{minHeight: '100vh'}}>
                <Item elevation={6}>
                    <form onSubmit={e => onSubmit(e)} style={{marginTop: 10}}>
                        <Grid container spacing={1} justifyContent="center">
                            <Grid item sm={10} lg={11} xs={11}>
                                {theGames.length < 10 ? (
                                    <>
                                        <TeamSelectComponent
                                            selectedTeam={selectedTeam1}
                                            handleChange={handleChangeTeam1}
                                            label="Home Team"
                                            id="team1-select"
                                        />
                                        <TeamSelectComponent
                                            selectedTeam={selectedTeam2}
                                            handleChange={handleChangeTeam2}
                                            label="Away Team"
                                            id="team2-select"
                                        />
                                        <FormControl fullWidth style={{margin: 5}}>
                                            <TextField
                                                label="League Name"
                                                value={currentGameLeague}
                                                onChange={(e) => setCurrentGameLeague(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth style={{margin: 5}}>
                                            <TextField
                                                type="date"
                                                label="Game Date"
                                                value={currentGameDate}
                                                onChange={(e) => setCurrentGameDate(e.target.value)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </FormControl>
                                    </>
                                ) : (
                                    <Typography component="div" variant="h5" color="text.primary">
                                        10 games added
                                    </Typography>
                                )}


                            </Grid>
                            <Grid item sm={10} lg={11} xs={11}>
                                <FormControl>

                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Jornada"
                                        multiline
                                        maxRows={4}
                                        name='jornadaNum'
                                        value={jornadaNum}
                                        onChange={onChangeNum}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={10} lg={11} xs={11}>
                                <FormControl>

                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Price"
                                        multiline
                                        maxRows={4}
                                        name='price'
                                        value={price}
                                        onChange={onChangeNum}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={10} lg={11} xs={11}>
                                <FormControl>

                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Premio $"
                                        multiline
                                        maxRows={4}
                                        name='prize'
                                        value={prize}
                                        onChange={onChangeNum}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={10} lg={11} xs={11}>
                                <FormControl>

                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Empieza"
                                        multiline
                                        maxRows={4}
                                        name='startDate'
                                        value={startDate}
                                        onChange={onChangeNum}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={10} lg={11} xs={11}>
                                <FormControl>

                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Termina"
                                        multiline
                                        maxRows={4}
                                        name='endDate'
                                        value={endDate}
                                        onChange={onChangeNum}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                    </form>
                    {theGames.length<10?
                        <Button style={{margin: 10}} variant="contained" color="primary" onClick={addEntryClick} value={text}>add</Button>
                        :
                        <Button style={{margin: 10}} type="submit" variant="contained" color="primary" onClick={onSubmit}>submit</Button>
                    }
                    <GameListComponent games={theGames}/>
                </Item>

            </Box>
        </Fragment>
    )
}

export default CreateJornada;