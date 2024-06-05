'use client';

import React, { useEffect, useState } from 'react';
import SingleQuiniela from '@/app/components/quinielas/SingleQuiniela';
import { useStore } from '@/app/store/store';
import { fetchUserQuinielas, fetchUserQuinielasByJornadaId } from '@/app/services/quinielasService';
import { fetchAllJornadas } from '@/app/services/jornadaService';
import {
    FormControl,
    Grid,
    Button,
    Typography,
    Box,
    Paper,
    MenuItem,
    Select,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '15px auto 0px auto'
}));

const UserDashboard = () => {
    const user = useStore((state) => state.user);
    const jornada = useStore((state) => state.jornada);
    const jornadas = useStore((state) => state.jornadas);
    const quinielas = useStore((state) => state.userQuinielas);
    const [currentJornada, setCurrentJornada] = useState('');

    useEffect(() => {
        const loadJornadasAndQuinielas = async () => {
            try {
                const fetchedJornadas = await fetchAllJornadas();

                if (jornada) {
                    const userQuinielas = await fetchUserQuinielas({ jornada, user });

                }
                setCurrentJornada(jornada ? jornada.id : '');
            } catch (error) {
                console.error('Error loading jornadas and quinielas:', error);
            }
        };

        loadJornadasAndQuinielas();
    }, [user]);

    const handleChange = async (event) => {
        const selectedJornadaId = event.target.value;
        setCurrentJornada(selectedJornadaId);

        try {
            const userQuinielas = await fetchUserQuinielasByJornadaId({ id: selectedJornadaId, user });
        } catch (error) {
            console.error('Error fetching quinielas by jornada ID:', error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Item elevation={6}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item sm={10} lg={10} xs={10}>
                        <Typography variant="h4" component="h2" gutterBottom style={{ color: '#333', fontFamily: '"Roboto", sans-serif' }}>
                            Mis Quinielas
                        </Typography>
                        <Divider>
                            <SportsSoccerIcon />
                        </Divider>
                        <Typography variant="h5" component="div" gutterBottom style={{ color: 'blue' }}>
                            Jornada
                        </Typography>
                        {jornadas && jornadas.length > 0 && (
                            <FormControl fullWidth>
                                <Select
                                    displayEmpty
                                    value={currentJornada}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    id="demo-simple-select"
                                    sx={{ fontSize: '1.5rem' }}
                                >
                                    {jornadas.map((jornada) => (
                                        <MenuItem key={jornada.id} value={jornada.id} sx={{ fontSize: '1.5rem' }}>
                                            {jornada.jornadaNum}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Grid>
                    <Grid item sm={10} lg={10} xs={10}>
                        {jornada ? (
                            <>
                                <Typography variant="h5" component="div" gutterBottom>
                                    Quinielas Compradas
                                </Typography>
                                <Typography variant="h4" component="div" gutterBottom style={{ color: '#004e98' }}>
                                    {quinielas?quinielas.length:0}
                                </Typography>
                            </>
                        ) : null}
                    </Grid>
                </Grid>
            </Item>

            {user && quinielas && quinielas.length > 0 && (
                <Grid container spacing={1} style={{ marginTop: 5 }}>
                    {quinielas.map((post, index) => (
                        <SingleQuiniela
                            key={index}
                            quiniela={post}
                            index={index}
                            showDelete={false}
                            showScore={true}
                        />
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default UserDashboard;
