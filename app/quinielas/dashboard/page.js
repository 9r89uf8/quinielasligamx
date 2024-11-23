'use client';

import React, { useEffect, useState } from 'react';
import WinnersList from '@/app/components/top/WinnersList';
import UserResults from '@/app/components/top/UserResults';
import { useStore } from '@/app/store/store';
import { fetchAllJornadas, fetchLatestJornada } from '@/app/services/jornadaService';
import { fetchQuinielas, fetchUserQuinielasByJornadaId } from '@/app/services/quinielasService';
import {
    Grid,
    Box,
    Typography,
    Paper,
    MenuItem,
    Select,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SavingsIcon from '@mui/icons-material/Savings';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SingleQuiniela from "@/app/components/quinielas/SingleQuiniela";
import BalanceDisplay from "@/app/components/top/BalanceDisplay";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '12px auto 2px auto'
}));

const StyledText = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    background: 'linear-gradient(45deg, #02CC92 8%, #1283C9 80%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
    color: 'white',
    padding: 5,
    fontSize: 22,
    textAlign: 'center',
    width: 200,
    margin: '8px auto 15px auto'
}));

const StyledTextTwo = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    background: "linear-gradient(45deg, #3d52d5 8%, #090c9b 80%)",
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
    color: 'white',
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    margin: '10px 10px 10px 10px'
}));

const StyledTextThree = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    background: 'linear-gradient(45deg, #80ed99 30%, #57cc99 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
    color: 'white',
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
    width: 250,
    margin: '8px auto 15px auto'
}));

const Dashboard = () => {
    const user = useStore((state) => state.user);
    const jornada = useStore((state) => state.jornada);
    const quinielas = useStore((state) => state.quinielas);
    const userQuinielas = useStore((state) => state.userQuinielas);
    const jornadas = useStore((state) => state.jornadas);


    const [loading, setLoading] = useState(true);
    const [currentJornadaId, setCurrentJornadaId] = useState('');

    useEffect(() => {
        const loadJornadasAndQuinielas = async () => {
            try {
                setLoading(true);
                if (!jornadas || jornadas.length === 0) {
                    const fetchedJornadas = await fetchAllJornadas();
                }
                if (!jornada) {
                    const latestJornada = await fetchLatestJornada();
                    setCurrentJornadaId(latestJornada.active.id);

                    if (user ) {
                        const userQuinielasData = await fetchUserQuinielasByJornadaId({ id: latestJornada.active.id, user });
                    }

                }else {
                    setCurrentJornadaId(jornada.id);
                    if (user ) {
                        const userQuinielasData = await fetchUserQuinielasByJornadaId({ id: jornada.id, user });
                    }
                }

                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error loading jornadas and quinielas:', error);
            }
        };

        loadJornadasAndQuinielas();
    }, [user]);

    const handleChange = async (event) => {
        const selectedJornadaId = event.target.value;
        setCurrentJornadaId(selectedJornadaId);

        try {
            const userQuinielasData = await fetchUserQuinielasByJornadaId({ id: selectedJornadaId, user });
        } catch (error) {
            console.error('Error fetching quinielas by jornada ID:', error);
        }
    };

    return (
        <Box padding={2}>
            <Grid container spacing={1} justifyContent="center">
                <Grid item sm={12} lg={10} xs={12}>
                    <BalanceDisplay/>
                </Grid>


                <Grid item sm={11} lg={10} xs={11}>
                    <UserResults
                        currentJornadaId={currentJornadaId}
                        handleChange={handleChange}
                        jornadas={jornadas}
                        user={user}
                        userQuinielas={userQuinielas}
                        jornada={jornada}
                        quinielas={quinielas}
                    />
                </Grid>


                {!loading && user && userQuinielas && userQuinielas.length > 0 && (
                    <Grid container spacing={2} justifyContent="center">
                        {userQuinielas.map((post, index) => (
                            <SingleQuiniela
                                key={index}
                                quiniela={post}
                                index={index}
                                showDelete={false}
                                showScore={false}
                            />
                        ))}
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default Dashboard;

