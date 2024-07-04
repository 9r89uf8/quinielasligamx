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
            <StyledText key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.team1.logo} alt={item.team1.name} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    <span>{item.team1.name}</span>
                </div>
                <span>vs</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{item.team2.name}</span>
                    <img src={item.team2.logo} alt={item.team2.name} style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
                </div>
            </StyledText>
        ))}
    </>
);

export default GameListComponent;