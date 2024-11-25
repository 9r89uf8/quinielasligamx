import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Container,
    Grid
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const PrizeCard = ({ country, amount, currency }) => {

    return (
        <Card
            sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                height: '100%'
            }}
        >
            <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                    <LocationOnIcon />
                    <Typography variant="h6">
                        {country}
                    </Typography>
                </Box>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    ${amount.toLocaleString()}
                </Typography>
                <Typography variant="h4" sx={{ opacity: 0.9 }}>
                    {currency}
                </Typography>
            </CardContent>
        </Card>
    );
};

const PrizeDisplay = () => {
    return (
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
                    borderRadius: 2,
                    p: 4,
                    color: 'white',
                    boxShadow: 16,
                    marginBottom: 5
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 4 }}>
                            Con 9 puntos ganas
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <PrizeCard
                            country="México"
                            amount={150000}
                            currency="pesos"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PrizeCard
                            country="Estados Unidos"
                            amount={10000}
                            currency="dólares"
                        />
                    </Grid>
                </Grid>

                <Typography
                    variant="caption"
                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        mt: 3,
                        opacity: 0.8
                    }}
                >
                    *Los montos pueden variar según la región específica
                </Typography>
            </Box>
    );
};

export default PrizeDisplay;