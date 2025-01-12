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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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

const StyledCard = ({ children, ...props }) => (
    <Card
        {...props}
        sx={{
            background: 'linear-gradient(45deg, #f8f9fa 30%, #e9ecef 90%)',
            borderRadius: '12px',
            marginBottom: '15px',
        }}
    >
        {children}
    </Card>
);

const StatBox = ({ value, label, icon }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            width: '50%',
        }}
    >
        {icon}
        <Typography
            variant="h4"
            component="div"
            sx={{
                fontWeight: 'bold',
                fontSize: '28px',
                marginBottom: '4px'
            }}
        >
            {value}
        </Typography>
        <Typography
            variant="body1"
            sx={{
                color: 'text.secondary',
                fontSize: '16px'
            }}
        >
            {label}
        </Typography>
    </Box>
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

    const list = quiniela.games.map((item, idx) => (
        <Grid key={idx} container spacing={1} justifyContent="center">
            <Grid item xs={12}>
                <MatchDisplay match={item} />
            </Grid>
        </Grid>
    ));

    return (
        <Grid item xs={12} sm={6} key={index} sx={{ position: 'relative' }}>
            <StyledCard>
                <CardContent>
                    <Item>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1
                            }}
                        >
                            <PersonIcon sx={{ color: 'primary.main', fontSize: '28px' }} />
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: 'bold', overflowWrap: 'break-word', wordWrap: 'break-word', }}
                            >
                                {quiniela.userName}
                            </Typography>
                        </Box>
                    </Item>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <StatBox
                            value={quiniela.correctAmount}
                            label="Puntos"
                        />
                        <StatBox
                            value={quiniela.jornadaNum}
                            label="Jornada"
                        />
                    </Box>

                    {list}
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', display: 'flex' }}>
                    {showDelete && (
                        <Button
                            onClick={() => handleDelete(quiniela.id)}
                            variant="contained"
                            color="warning"
                        >
                            Borrar
                        </Button>
                    )}
                </CardActions>
            </StyledCard>
        </Grid>
    );
};

export default SingleQuiniela;


