// components/FantasyScoreList.js
import React from 'react';
import {
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Divider,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';

const FantasyScoreList = ({ scores }) => {
    return (
        <Paper
            sx={{
                background: 'linear-gradient(135deg, #f8f9fa, #dee2e6)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: 3,
                marginTop: 4,
                marginBottom: 4,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Ganadores Recientes
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
                Jugadores de Estados Unidos y México
            </Typography>

            <List>
                {scores.map((score, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <EmojiEvents />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {score.user}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            variant="h6"
                                            color="text.secondary"
                                            component="span"
                                            display="block"
                                        >
                                            {score.gameName} - {score.gameYear}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ mt: 1 }}
                                            component="span"
                                            display="block"
                                        >
                                            <strong>Puntos: 9 </strong>
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ mt: 1 }}
                                            component="span"
                                            display="block"
                                        >
                                            <strong>Premio:</strong> {score.prize} {score.currency}
                                        </Typography>
                                    </>
                                }
                                secondaryTypographyProps={{ component: 'div' }}
                            />
                        </ListItem>
                        {index < scores.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default FantasyScoreList;


