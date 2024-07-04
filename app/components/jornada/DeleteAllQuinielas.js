import React from 'react';
import {Button} from "@mui/material";
import {deleteAllQuinielasByJornadaId} from "@/app/services/quinielasService";

const DeleteAllQuinielas = ({jornada, loading}) => {

    const handleClick = async (event) => {
        // Confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to create dummy quinielas?");
        if (isConfirmed) {
            const paymentData = {id: jornada.id};
            await deleteAllQuinielasByJornadaId(paymentData);
            // navigate('/user');
        }
    };

    return (
        <Button
            disabled={loading}
            onClick={handleClick}
            style={{
                backgroundImage: 'linear-gradient(45deg, #e85d04, #dc2f02)',
                color: 'white',
                padding: '10px 20px',
                marginBottom: 5,
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: 14
            }}
        >
            {loading?<span>Loading....</span>:<span>Delete All</span>}
        </Button>
    );
};

export default DeleteAllQuinielas;