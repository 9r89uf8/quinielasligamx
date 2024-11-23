import React from 'react';
import { Grid, Typography, Divider, FormControl, Select, MenuItem } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';

const GradientBackground = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #4cc9f0 0%, #4361ee 100%)",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    marginTop: 15,
    marginBottom: 25,
    color: '#ffffff',
}));

const GreetingText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1.8rem',
}));

const SubtitleText = styled(Typography)(({ theme }) => ({
    fontSize: '1.4rem',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#292929',
    marginTop: 15
}));

const QuinielaNumber = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 'bold',
}));

const PointsText = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
}));

const StatusText = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    marginTop: theme.spacing(1),
}));

const UserResults = ({ currentJornadaId, handleChange, jornadas, user, userQuinielas, jornada, quinielas }) => {
    return (
        <GradientBackground>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <GreetingText>
                        Hola {user && user.name ? user.name : 'Usuario'}
                    </GreetingText>
                    <SubtitleText>
                        Aquí están tus resultados de las quinielas que compraste
                    </SubtitleText>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="div">
                        Selecciona Jornada
                    </Typography>
                    <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                        <Select
                            displayEmpty
                            value={currentJornadaId}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{
                                color: '#ffffff',
                                '.MuiSelect-icon': { color: '#ffffff' },
                                '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                            }}
                        >
                            {jornadas && jornadas.length > 0&&jornadas.map((jornada) => (
                                <MenuItem key={jornada.id} value={jornada.id}>
                                    {jornada.jornadaNum}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {userQuinielas && userQuinielas.length > 0 ? (
                userQuinielas.map((item, i) => (
                    <StyledPaper key={item.id} elevation={6}>
                        <Grid container direction="column" alignItems="center">
                            <Grid item>
                                <QuinielaNumber>
                                    Quiniela #{i + 1}
                                </QuinielaNumber>
                            </Grid>
                            <Grid item>
                                <PointsText>
                                    {item.correctAmount} Puntos
                                </PointsText>
                            </Grid>
                            <Grid item>
                                {item.winner ? (
                                    <StatusText sx={{ color: 'greenyellow' }}>¡Ganaste!</StatusText>
                                ) : !jornada.played ? (
                                    <StatusText sx={{ color: 'coral' }}>Jornada sin terminar</StatusText>
                                ) : jornada.jornadaNum !== item.jornadaNum ? (
                                    <StatusText sx={{ color: 'coral' }}>Jornada sin jugar</StatusText>
                                ) : (
                                    <StatusText sx={{ color: 'coral' }}>No ganaste</StatusText>
                                )}
                            </Grid>
                        </Grid>
                    </StyledPaper>
                ))
            ) : (
                <Typography variant="h5" component="div" gutterBottom sx={{ color: '#ffffff', mt: 3 }}>
                    No tienes quinielas
                </Typography>
            )}
        </GradientBackground>
    );
};

export default UserResults;



