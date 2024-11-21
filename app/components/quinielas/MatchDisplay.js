import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
} from '@mui/material';

const MatchDisplay = ({ match, prediction }) => {
    const getPredictionColor = (correct, gamePlayed) => {
        if (gamePlayed) {
            return correct ? '#0077b6' : '#dc2f02';
        }
        return '#203a43';
    };

    const getPredictionLabel = (guess) => {
        switch (guess) {
            case 'L': return 'Local';
            case 'E': return 'Empate';
            case 'V': return 'Visitante';
            default: return guess;
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                margin: '8px 0',
                overflow: 'hidden',
                borderRadius: '12px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                    color: '#FFFFFF',
                }}
            >
                {/* Home Team */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, marginRight: '8px' }}>
                        {match.team1.name}
                    </Typography>
                    <img
                        src={match.team1.logo}
                        alt={match.team1.name}
                        style={{ width: '32px', height: '32px' }}
                    />
                </Box>

                {/* Score & Prediction */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '0 16px',
                        minWidth: '120px',
                    }}
                >
                    {match.gameCancelled ? (
                        <Typography
                            sx={{
                                color: '#ff4444',
                                fontWeight: 'bold',
                                fontSize: '14px',
                            }}
                        >
                            Cancelado
                        </Typography>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                {match.team1.score}
                            </Typography>
                            <Typography sx={{ fontSize: '16px', color: '#adb5bd' }}>-</Typography>
                            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                {match.team2.score}
                            </Typography>
                        </Box>
                    )}

                    {/* Prediction Box */}
                    <Paper
                        sx={{
                            marginTop: '8px',
                            padding: '4px 12px',
                            background: getPredictionColor(match.correct, match.gamePlayed),
                            color: 'white',
                            borderRadius: '16px',
                            minWidth: '80px',
                            textAlign: 'center',
                        }}
                    >
                        <Typography sx={{ fontSize: '19px', fontWeight: 500 }}>
                            {getPredictionLabel(match.guess)}
                        </Typography>
                    </Paper>
                </Box>

                {/* Away Team */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={match.team2.logo}
                        alt={match.team2.name}
                        style={{ width: '32px', height: '32px' }}
                    />
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, marginLeft: '8px' }}>
                        {match.team2.name}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};


export default MatchDisplay;