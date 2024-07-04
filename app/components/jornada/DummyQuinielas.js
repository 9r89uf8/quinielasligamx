import React from 'react';
import {Button} from "@mui/material";
import {addDummyQuinielas} from "@/app/services/quinielasService";


const DummyQuinielas = ({jornada, loading}) => {


    // Extract gameIds from jornada.games
    let games = jornada.games.map(game => game);

    const handleClick = async (event) => {
        // Confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to create dummy quinielas?");
        if (isConfirmed) {
            const paymentData = {games: games, jornada: jornada};
            await addDummyQuinielas(paymentData);
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
                fontSize: 18
            }}
        >
            {loading?<span>Loading....</span>:<span>Dummy Quinielas</span>}
        </Button>
    );
};

export default DummyQuinielas;