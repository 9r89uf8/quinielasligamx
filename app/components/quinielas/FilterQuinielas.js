import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, Typography, Button, Paper } from '@mui/material';
import {alpha, styled} from "@mui/material/styles";
import {fetchQuinielasByPoints, fetchQuinielas} from "@/app/services/quinielasService";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
    color: 'black',
    background: 'linear-gradient(45deg, #f8f9fa 30%, #e9ecef 90%)',
    borderRadius: 10 // rounded corners
}));
const FilterQuinielas = ({jornada}) => {
    const [show, setShow] = useState(true);

    const handleTogglePoints = async ()=> {
        setShow(!show);
        await fetchQuinielasByPoints({jornada: jornada})
    };

    const handleToggleRecent = async () => {
        setShow(!show);
        await fetchQuinielas({jornada: jornada})
    };
    return (
        <Item elevation={6}>
            <Typography variant="h5" gutterBottom align="center" color="inherit">
                Quinielas Activas
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                        <Button
                            disabled={show}
                            onClick={handleToggleRecent}
                            style={{
                                backgroundImage: show?'linear-gradient(45deg, #6c757d 30%, #495057 90%)':'linear-gradient(45deg, #ffffff 30%, #f8f9fa 90%)',
                                color: 'black',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                marginTop: '10px',
                                boxShadow: '0 3px 5px 2px rgba(255, 255, 255, 0.3)', // White boxShadow
                                opacity: show ? 0.5 : 1,
                            }}
                        >
                            Recientes
                        </Button>
                </Grid>

                {/* Private Posts */}
                <Grid item xs={6}>
                        <Button
                            disabled={!show}
                            onClick={handleTogglePoints} // Adjust this if you have a separate handler for private posts
                            style={{
                                backgroundImage: !show?'linear-gradient(45deg, #6c757d 30%, #495057 90%)':'linear-gradient(45deg, #ffffff 30%, #f8f9fa 90%)',
                                color: 'black',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                marginTop: '10px',
                                boxShadow: '0 3px 5px 2px rgba(255, 255, 255, 0.3)', // White boxShadow
                                opacity: !show ? 0.5 : 1
                            }}
                        >
                            Puntos
                        </Button>
                </Grid>
            </Grid>
        </Item>

    );
};

export default FilterQuinielas;
