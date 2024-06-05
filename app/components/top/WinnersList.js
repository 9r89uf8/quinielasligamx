// WinnersList.js
import React from 'react';
import { Grid, Typography, Divider, Chip } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import FaceIcon from '@mui/icons-material/Face';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const StyledTextTwo = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    background:"linear-gradient(45deg, #3d52d5 8%, #090c9b 80%)",
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
    color: 'white',
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    margin: '10px 10px 10px 10px'
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin:'12px auto 2px auto'
}));
const WinnersList = ({ quinielas, jornada }) => {
    let winnersList = quinielas.map((item, i) => {
        return (
            <>
                {item.winner && (
                    <StyledTextTwo key={i}>
                        <Grid container spacing={1} justifyContent="center">
                            <Grid item sm={4} lg={4} xs={12}>
                                <Chip color="primary" icon={<FaceIcon />} label={item.userName} style={{ marginLeft: 2 }} />
                            </Grid>

                            <Grid item sm={4} lg={4} xs={4}>
                                {item.correctAmount} Puntos
                            </Grid>

                            <Grid item sm={4} lg={4} xs={4}>
                                <span style={{ color: 'greenyellow' }}>Ganador</span>
                            </Grid>
                        </Grid>
                    </StyledTextTwo>
                )}
            </>
        );
    });

    return (
        <Grid item sm={11} lg={10} xs={11}>
            <Item elevation={6}>
                <Typography component="div" variant="h5" color="text.primary">
                    Quinielas ganadoras de otros jugadores
                </Typography>
                <Divider>
                    <MilitaryTechIcon />
                </Divider>
                <Typography component="div" variant="h6" style={{ color: "blue" }}>
                    Jornada {jornada.jornadaNum}
                </Typography>
                {!jornada.played ? (
                    <Typography component="div" variant="h6" style={{ color: 'blue' }}>
                        Esperando resultados de la jornada {jornada.jornadaNum}
                    </Typography>
                ) : (
                    winnersList
                )}
            </Item>
        </Grid>
    );
};

export default WinnersList;
