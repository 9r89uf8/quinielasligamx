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

    const TeamDisplay = ({ team, alignItems = 'center' }) => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '120px', // Fixed width for consistent layout
                textAlign: 'center',
            }}
        >
            <img
                src={team.logo}
                alt={team.name}
                style={{
                    width: '40px',
                    height: '40px',
                    marginBottom: '8px'
                }}
            />
            <Typography
                sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}
            >
                {team.name}
            </Typography>
        </Box>
    );

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
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                    color: '#FFFFFF',
                }}
            >
                {/* Home Team */}
                <TeamDisplay team={match.team1} />

                {/* Score & Prediction */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '0 12px',
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
                            <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                                {match.team1.score}
                            </Typography>
                            <Typography sx={{ fontSize: '20px', color: '#adb5bd' }}>-</Typography>
                            <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                                {match.team2.score}
                            </Typography>
                        </Box>
                    )}

                    {/* Prediction Box */}
                    <Paper
                        sx={{
                            marginTop: '8px',
                            padding: '4px 16px',
                            background: getPredictionColor(match.correct, match.gamePlayed),
                            color: 'white',
                            borderRadius: '16px',
                            minWidth: '80px',
                            textAlign: 'center',
                        }}
                    >
                        <Typography sx={{ fontSize: '21px', fontWeight: 500 }}>
                            {getPredictionLabel(match.guess)}
                        </Typography>
                    </Paper>
                </Box>

                {/* Away Team */}
                <TeamDisplay team={match.team2} />
            </Box>
        </Paper>
    );
};

export default MatchDisplay;