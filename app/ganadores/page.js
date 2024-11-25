'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/app/store/store';
import { fetchQuinielasWinners } from '@/app/services/quinielasService';
import {
    Box,
    Typography,
    styled,
    Paper,
    Grid,
    Button,
    Card,
    CardContent,
} from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #f8f9fa, #e9ecef)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    color: 'black',
    cursor: 'pointer',
    padding: '6px 16px',
    fontSize: '0.985rem',
    marginBottom: 5,
    lineHeight: '1.5',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
    '&.selected': {
        background: 'rgba(255, 255, 255, 0.5)',
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(135deg, #f8f9fa, #dee2e6)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: 2,
    borderRadius: 2,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    color: 'black',
    margin: '10px auto 30px auto',
}));

const ScrollableContainer = styled('div')(({ theme }) => ({
    maxHeight: '400px',
    overflowY: 'auto',
    padding: theme.spacing(1),
}));

const WinnerCard = ({ winner }) => {
    const date = new Date(
        winner.timestamp._seconds * 1000 + winner.timestamp._nanoseconds / 1e6
    );
    const formattedDate = date.toLocaleDateString();

    return (
        <Card
            sx={{
                display: 'flex',
                marginBottom: 2,
                background: "linear-gradient(135deg, #4cc9f0 0%, #4361ee 100%)",
                boxShadow: 3,
                color: '#f8f9fa'
            }}
        >
            <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="h5">
                            {winner.user}
                        </Typography>
                        <Typography variant="h6">
                            {formattedDate}
                        </Typography>
                        <Typography variant="h6">
                            Country: {winner.country}
                        </Typography>

                        <Typography variant="h6">
                            Points: {winner.correctAmount}
                        </Typography>
                        <Typography variant="h6">
                            Prize: ${winner.prize} USD
                        </Typography>

            </CardContent>
        </Card>
    );
};

const Ganadores = () => {
    const [visible, setVisible] = useState(5);

    const winners = useStore((state) => state.winners);

    const showMoreItems = () => {
        setVisible((prevState) => prevState + 2);
    };

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                await fetchQuinielasWinners();
                // Assuming fetchQuinielasWinners updates the store
            } catch (error) {
                console.error('Error fetching winners:', error);
            }
        };

        fetchWinners();
    }, []);

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={11} sm={6}>
            <Item elevation={6}>
                <MilitaryTechIcon
                    sx={{ color: '#3d52d5', margin: '8px auto' }}
                />
                <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    style={{ color: 'blue' }}
                >
                    Ganadores Recientes
                </Typography>

                <ScrollableContainer>
                    {winners &&
                        winners.slice(0, visible).map((item, index) => (
                            <WinnerCard key={index} winner={item} />
                        ))}
                </ScrollableContainer>
                {winners && winners.length > visible && (
                    <div style={{ textAlign: 'center' }}>
                        <GradientButton
                            type="submit"
                            variant="contained"
                            onClick={showMoreItems}
                        >
                            Mostrar más
                        </GradientButton>
                    </div>
                )}
            </Item>
            </Grid>
        </Grid>
    );
};

export default Ganadores;
