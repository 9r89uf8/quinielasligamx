import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const MatchDisplay = ({ match }) => {
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

    const TeamDisplay = ({ team }) => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '120px',
            textAlign: 'center'
        }}>
            <img
                src={team.logo}
                alt={team.fullName}
                style={{
                    width: '40px',
                    height: '40px',
                    marginBottom: '8px'
                }}
            />
            <div style={{
                fontSize: '17px',
                fontWeight: 500,
                maxWidth: '100%',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                lineHeight: '1.2',
                minHeight: '40px',
                display: 'flex',
                alignItems: 'center'
            }}>
                {team.fullName}
            </div>
        </div>
    );

    const ResultIcon = ({ correct, gamePlayed }) => {
        if (!gamePlayed) return null;

        return correct ? (
            <svg viewBox="0 0 24 24" width="28" height="28" style={{ color: '#4caf50', marginTop: '4px' }}>
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        ) : (
            <svg viewBox="0 0 24 24" width="28" height="28" style={{ color: '#f44336', marginTop: '4px' }}>
                <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
        );
    };

    return (
        <div style={{
            margin: '8px 0',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                color: '#FFFFFF'
            }}>
                <TeamDisplay team={match.team1} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 12px',
                    minWidth: '120px'
                }}>
                    {match.gameCancelled ? (
                        <div style={{
                            color: '#ff4444',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}>
                            Cancelado
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {match.team1.score}
              </span>
                            <span style={{ fontSize: '20px', color: '#adb5bd' }}>-</span>
                            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {match.team2.score}
              </span>
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            marginTop: '8px',
                            padding: '4px 16px',
                            background: getPredictionColor(match.correct, match.gamePlayed),
                            color: 'white',
                            borderRadius: '16px',
                            minWidth: '80px',
                            textAlign: 'center'
                        }}>
              <span style={{ fontSize: '21px', fontWeight: 500 }}>
                {getPredictionLabel(match.guess)}
              </span>
                        </div>

                        <ResultIcon correct={match.correct} gamePlayed={match.gamePlayed} />
                    </div>
                </div>

                <TeamDisplay team={match.team2} />
            </div>
        </div>
    );
};

export default MatchDisplay;