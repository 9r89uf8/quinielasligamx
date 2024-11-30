import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const SimpleMatchDisplay = ({ match }) => {
    const TeamDisplay = ({ team }) => (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '200px',
                textAlign: 'center',
                flexDirection: 'column',
            }}
        >
            <img
                src={team.logo}
                alt={team.name}
                style={{
                    width: '50px',
                    height: '50px',
                    marginBottom: '8px',
                }}
            />
            <Typography
                sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
            >
                {team.name}
            </Typography>
        </Box>
    );

    const getPredictionLabel = (guess) => {
        switch (guess) {
            case 'L':
                return 'Local';
            case 'E':
                return 'Empate';
            case 'V':
                return 'Visitante';
            default:
                return guess;
        }
    };

    return (
        <Paper
            elevation={2}
            sx={{
                margin: '6px 0',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#f7f7f7',
                width: '100%', // Added to ensure full width
            }}
        >
            <Grid container alignItems="center" justifyContent="center">
                {/* Home Team */}
                <Grid item xs={3} container justifyContent="center">
                    <TeamDisplay team={match.team1} />
                </Grid>

                {/* VS and Prediction */}
                <Grid item xs={6} container flexDirection="column" alignItems="center">
                    <Typography
                        sx={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginBottom: '8px',
                        }}
                    >
                        VS
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#0077b6',
                        }}
                    >
                        {getPredictionLabel(match.guess)}
                    </Typography>
                </Grid>

                {/* Away Team */}
                <Grid item xs={3} container justifyContent="center">
                    <TeamDisplay team={match.team2} />
                </Grid>
            </Grid>
        </Paper>
    );
};

const SimpleQuinielaDisplay = ({ quiniela }) => {
    return (
        <Box
            sx={{
                padding: '5px',
                width: '100%', // Added to ensure full width
            }}
        >
            {quiniela.games.map((match, idx) => (
                <SimpleMatchDisplay key={idx} match={match} />
            ))}
        </Box>
    );
};

export default SimpleQuinielaDisplay;
