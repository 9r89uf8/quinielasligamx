import React from 'react';
import {Button} from "@mui/material";
import {addDummyQuinielaWinners} from "@/app/services/quinielasService";

const DummyQuinielaWinner = ({jornada, loading}) => {


    // Extract gameIds from jornada.games
    let games = jornada.games.map(game => game);

    const handleClick = async (event) => {
        // Confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to create dummy quinielas?");
        if (isConfirmed) {
            const paymentData = {games: games, jornada: jornada};
            await addDummyQuinielaWinners(paymentData);
            // navigate('/user');
        }
    };

    return (
        <Button
            disabled={loading}
            onClick={handleClick}
            style={{
                backgroundImage: 'linear-gradient(45deg, #0077b6, #023e8a)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                fontWeight: 'bold',
                marginBottom: 5,
                fontSize: 15
            }}
        >
            {loading?<span>Loading....</span>:<span>Dummy Quinielas Winners</span>}
        </Button>
    );
};

export default DummyQuinielaWinner;