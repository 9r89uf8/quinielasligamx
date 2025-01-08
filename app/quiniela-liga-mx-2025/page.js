// app/quinielas/page.js
'use client'
import React, {useEffect} from 'react';
import {fetchAllJornadas, fetchLatestJornada, fetchLatestJornadaServer} from "@/app/services/jornadaService";
import {fetchQuinielas} from "@/app/services/quinielasService";
import {Box, Grid, Typography} from '@mui/material';
import { useStore } from '@/app/store/store';
import SingleQuiniela from '@/app/components/quinielas/SingleQuiniela';

import JornadaInfo from "@/app/components/JornadaInfo";


export default function Quinielas () {
    const jornada = useStore((state) => state.jornada);
    const quinielas = useStore((state) => state.quinielas);
    const jornadas = useStore((state) => state.jornadas);

    useEffect(() => {
        const loadJornadasAndQuinielas = async () => {
            try {
                if (!jornadas || jornadas.length === 0) {
                    const fetchedJornada = await fetchLatestJornada();
                    await fetchQuinielas({jornada:fetchedJornada.active})
                }

            } catch (error) {
                console.error('Error loading jornadas and quinielas:', error);
            }
        };

        loadJornadasAndQuinielas();
    }, []);

    return (
        <Box padding={2}>
            {/*<ContactUs/>*/}
            {/*<BuyBanner cart={cart?cart:null} jornada={jornada?jornada:null}/>*/}
            <JornadaInfo jornada={jornada}/>
            {/*<WinningsReceptionMethods/>*/}
            {/*<QuinielaWinners/>*/}
            {/*<FilterQuinielas jornada={jornada}/>*/}
            <Grid container spacing={2} justifyContent="center">
                {quinielas && quinielas.length > 0 ? (
                    quinielas.map((quiniela, index) => (
                        <SingleQuiniela key={quiniela.id} quiniela={quiniela} index={index} showDelete={false} showScore={true} />
                    ))
                ) : (
                    <Typography variant="body1">No quinielas found.</Typography>
                )}
            </Grid>
        </Box>
    );
};



