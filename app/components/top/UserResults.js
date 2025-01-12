import React, { useState } from 'react';
import {
    Grid,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Button,
    List,
    ListItem,
    Collapse
} from '@mui/material';
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
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
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
    fontSize: '1.4rem',
}));

const StatusText = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    marginTop: theme.spacing(1),
}));

const TransactionsList = styled(List)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
}));

const TransactionItem = styled(ListItem)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    '&:last-child': {
        borderBottom: 'none',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#4361ee',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
}));

const UserResults = ({ currentJornadaId, handleChange, jornadas, user, userQuinielas, jornada, transactions }) => {
    const [showTransactions, setShowTransactions] = useState(false);

    const handleToggleTransactions = () => {
        setShowTransactions(!showTransactions);
    };

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp._seconds) return 'Invalid date';
        const date = new Date(timestamp._seconds * 1000); // Convert seconds to milliseconds
        return date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit'
        });
    };

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
                            {jornadas && jornadas.length > 0 && jornadas.map((jornada) => (
                                <MenuItem key={jornada.id} value={jornada.id}>
                                    {jornada.jornadaNum}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <StyledButton
                        variant="contained"
                        onClick={handleToggleTransactions}
                    >
                        {showTransactions ? 'Ocultar Transacciones' : 'Transacciones'}
                    </StyledButton>

                    <Collapse in={showTransactions}>
                        <TransactionsList>
                            {transactions&&transactions.length>0&&transactions.map((transaction, index) => (
                                <TransactionItem key={index}>
                                    <Typography variant="subtitle1" sx={{ color: 'black' }}>
                                        Total: {transaction.amount} {transaction.currency}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'black' }}>
                                        Estado: {transaction.status === 'completed' ? 'Completado' : 'Fallido'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'black' }}>
                                        Fecha: {formatDate(transaction.timestamp)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'black' }}>
                                        Quinielas: {transaction.quinielaIds.join(', ')}
                                    </Typography>
                                </TransactionItem>
                            ))}
                            {(!transactions || transactions.length === 0) && (
                                <Typography variant="h5" sx={{ textAlign: 'center', py: 2, color: 'black' }}>
                                    No hay transacciones disponibles
                                </Typography>
                            )}
                        </TransactionsList>
                    </Collapse>
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