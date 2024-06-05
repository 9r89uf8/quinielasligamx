import React from 'react';
import { Grid, Typography, Divider, FormControl, Select, MenuItem } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '12px auto 2px auto'
}));

const StyledTextTwo = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    background: "linear-gradient(45deg, #3d52d5 8%, #090c9b 80%)",
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
    color: 'white',
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    margin: '10px 10px 10px 10px'
}));

const UserResults = ({ currentJornadaId, handleChange, jornadas, user, userQuinielas, jornada, quinielas }) => {
    return (
        <Item elevation={6}>
            <Grid container spacing={1} justifyContent="center">
                <Grid item sm={10} lg={10} xs={10}>
                    <Typography variant="h5" component="h2" gutterBottom style={{ color: '#333', fontFamily: '"Roboto", sans-serif' }}>
                        Mis Resultados
                    </Typography>
                    <Divider>
                        <SportsSoccerIcon />
                    </Divider>
                    <Typography variant="h5" component="div" gutterBottom style={{ color: 'blue' }}>
                        Jornada
                    </Typography>
                    {jornadas && jornadas.length > 0 && (
                        <FormControl fullWidth>
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
                        </FormControl>
                    )}
                </Grid>
                <Grid item sm={10} lg={10} xs={10}>
                    {user && (
                        <Typography variant="h5" component="div" gutterBottom style={{ color: '#004e98' }}>
                            {user.name}
                        </Typography>
                    )}
                </Grid>
            </Grid>
            {userQuinielas && userQuinielas.length > 0 ? (
                userQuinielas.map((item, i) => (
                    <StyledTextTwo key={item.id}>
                        <Grid container spacing={1} justifyContent="center">
                            <Grid item sm={4} lg={4} xs={4}>
                                Quiniela #{i + 1}
                            </Grid>
                            <Grid item sm={4} lg={4} xs={4}>
                                Puntos: {item.correctAmount}
                            </Grid>
                            <Grid item sm={4} lg={4} xs={4}>
                                {item.winner ? (
                                    <span style={{ color: 'greenyellow' }}>Ganaste</span>
                                ) : !jornada.played ? (
                                    <span style={{ color: 'coral' }}>Jornada sin terminar</span>
                                ) : jornada.jornadaNum !== item.jornadaNum ? (
                                    <span style={{ color: 'coral' }}>Jornada sin jugar</span>
                                ) : (
                                    <span style={{ color: 'coral' }}>No ganaste</span>
                                )}
                            </Grid>
                        </Grid>
                    </StyledTextTwo>
                ))
            ) : (
                <Typography variant="h5" component="div" gutterBottom style={{ color: 'blue' }}>
                    No Tienes Quinielas
                </Typography>
            )}
        </Item>
    );
};

export default UserResults;


