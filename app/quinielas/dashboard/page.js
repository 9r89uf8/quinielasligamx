'use client';

import React, { useEffect, useState } from 'react';
import UserResults from '@/app/components/top/UserResults';
import { useStore } from '@/app/store/store';
import {getTransactions} from "@/app/services/stripeService";
import { fetchAllJornadas, fetchLatestJornada } from '@/app/services/jornadaService';
import { fetchQuinielas, fetchUserQuinielasByJornadaId } from '@/app/services/quinielasService';
import {
    Grid,
    Box
} from '@mui/material';
import SingleQuiniela from "@/app/components/quinielas/SingleQuiniela";
import BalanceDisplay from "@/app/components/top/BalanceDisplay";

const Dashboard = () => {
    const user = useStore((state) => state.user);
    const jornada = useStore((state) => state.jornada);
    const transactions = useStore((state) => state.transactions);
    const userQuinielas = useStore((state) => state.userQuinielas);
    const jornadas = useStore((state) => state.jornadas);


    const [loading, setLoading] = useState(true);
    const [currentJornadaId, setCurrentJornadaId] = useState('');

    useEffect(() => {
        const loadJornadasAndQuinielas = async () => {
            try {

                await getTransactions()
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
                        transactions={transactions}
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

