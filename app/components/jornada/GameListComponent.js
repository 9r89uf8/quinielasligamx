// GameListComponent.js
import React from 'react';
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography"; // Assume you have these styled components defined

const StyledText = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    background: 'linear-gradient(45deg, #02CC92 8%, #1283C9 80%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
    color: 'white',
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
    margin: 4
}));

const StyledTextExtra = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    background: 'linear-gradient(45deg, #e63946 8%, #1283C9 80%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
    color: 'white',
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
    margin: 4
}));

const GameListComponent = ({ games }) => (
    <>
        {games.map((item, index) => (
            <StyledText key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={item.team1.logo} alt={item.team1.shortName} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                            <span>{item.team1.fullName}</span>
                            <small>({item.team1.shortName})</small>
                        </div>
                    </div>
                    <span>vs</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                            <span>{item.team2.fullName}</span>
                            <small>({item.team2.shortName})</small>
                        </div>
                        <img src={item.team2.logo} alt={item.team2.shortName} style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '0.8em' }}>
                    <span>{item.league}</span>
                    <span>{item.gameDate}</span>
                </div>
            </StyledText>
        ))}
    </>
);

export default GameListComponent;