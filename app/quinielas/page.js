// app/quinielas/page.js
'use client';
import React, { useEffect, useState } from 'react';
import { fetchQuinielas } from '@/app/services/quinielasService';
import {fetchLatestJornada} from "@/app/services/jornadaService";
import { useStore } from '@/app/store/store';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import SingleQuiniela from '@/app/components/quinielas/SingleQuiniela';
import ContactUs from "@/app/components/ContactUs";
import BuyBanner from "@/app/components/BuyBanner";
import JornadaInfo from "@/app/components/JornadaInfo";
import FilterQuinielas from "@/app/components/quinielas/FilterQuinielas";
import WinningsReceptionMethods from "@/app/components/WinningsReceptionMethods";
import QuinielaWinners from "@/app/components/quinielas/QuinielaWinners";

const Quinielas = () => {
    const [loading, setLoading] = useState(true);
    const quinielas = useStore((state) => state.quinielas);
    const jornada = useStore((state) => state.jornada);
    const cart = useStore((state) => state.cart);

    useEffect(() => {
        const loadJornadaAndQuinielas = async () => {
            try {
                const latestJornada = await fetchLatestJornada();
                await fetchQuinielas({ jornada: latestJornada.active });
            } catch (error) {
                console.error('Error loading jornada and quinielas:', error);
            } finally {
                setLoading(false);
            }
        };

        loadJornadaAndQuinielas();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box padding={2}>
            <ContactUs/>
            <BuyBanner cart={cart?cart:null} jornada={jornada?jornada:null}/>
            <JornadaInfo jornada={jornada}/>
            <WinningsReceptionMethods/>
            <QuinielaWinners/>
            <FilterQuinielas jornada={jornada}/>
            <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
                Quinielas
            </Typography>
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

export default Quinielas;


