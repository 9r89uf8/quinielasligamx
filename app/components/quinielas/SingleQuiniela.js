// SingleQuiniela.js
import React from 'react';
import MatchDisplay from "@/app/components/quinielas/MatchDisplay";
import {
    Box,
    Button,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    Avatar
} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScoreIcon from '@mui/icons-material/Score';
import { deleteQuiniela } from '@/app/services/quinielasService';
import { getCart } from '@/app/services/cartService';

// Functional components using sx prop without functions
const Item = ({ children, ...props }) => (
    <Paper
        {...props}
        sx={{
            padding: '2px',
            textAlign: 'center',
            color: 'text.secondary',
            margin: '-5px auto 9px auto',
        }}
    >
        {children}
    </Paper>
);

const UserStatsChip = ({ icon, label, value }) => (
    <Chip
        icon={icon}
        label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    {label}:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {value}
                </Typography>
            </Box>
        }
        sx={{
            margin: '4px',
            padding: '8px',
            height: 'auto',
            '& .MuiChip-icon': {
                color: 'primary.main',
            },
        }}
    />
);

const StyledCard = ({ children, ...props }) => (
    <Card
        {...props}
        sx={{
            background: 'linear-gradient(45deg, #f8f9fa 30%, #e9ecef 90%)',
            borderRadius: '12px',
            boxShadow: '0 3px 5px 2px rgba(11, 82, 91, 0.5)',
            marginBottom: '15px',
        }}
    >
        {children}
    </Card>
);

const StyledTextFour = ({ children, ...props }) => (
    <Typography
        {...props}
        sx={{
            background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
            border: 0,
            borderRadius: '12px',
            boxShadow: '0 3px 5px 2px rgba(11, 82, 91, 0.5)',
            color: 'white',
            padding: '5px',
            fontSize: '18px',
            textAlign: 'center',
            margin: '-10px auto 2px auto',
        }}
    >
        {children}
    </Typography>
);

const SingleQuiniela = ({
                            quiniela,
                            index,
                            showDelete,
                            showScore,
                            user,
                            buyJornada,
                        }) => {
    const handleDelete = async (id) => {
        await deleteQuiniela(id);
        await getCart({ jornada: buyJornada, user: user });
    };

// Update the list mapping in SingleQuiniela
    const list = quiniela.games.map((item, idx) => (
        <Grid key={idx} container spacing={1} justifyContent="center">
            <Grid item xs={12}>
                <MatchDisplay match={item} />
            </Grid>
        </Grid>
    ));

    return (
        <Grid item xs={11} sm={6} key={index} sx={{ position: 'relative' }}>
            <StyledCard>
                <CardContent>
                    <Item>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{ mt: 1, fontWeight: 'bold' }}
                                >
                                    {quiniela.userName}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Item>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={6}>
                            <UserStatsChip
                                icon={<EmojiEventsIcon />}
                                label="Puntos"
                                value={quiniela.points || 0}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <UserStatsChip
                                icon={<CalendarTodayIcon />}
                                label="Jornada"
                                value={quiniela.jornadaNum}
                            />
                        </Grid>
                    </Grid>
                    {list}
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', display: 'flex' }}>
                    {showScore && quiniela.quinielaStarted ? (
                        <StyledTextFour>Puntos: {quiniela.correctAmount}</StyledTextFour>
                    ) : null}
                    {showDelete ? (
                        <Button
                            onClick={() => handleDelete(quiniela.id)}
                            variant="contained"
                            color="warning"
                        >
                            Borrar
                        </Button>
                    ) : null}
                </CardActions>
            </StyledCard>
        </Grid>
    );
};

export default SingleQuiniela;


