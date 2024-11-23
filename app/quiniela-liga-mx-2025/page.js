// app/quinielas/page.js
import React from 'react';
import {fetchLatestJornadaServer} from "@/app/services/jornadaService";
import {fetchQuinielasServer} from "@/app/services/quinielasService";
import {Box, Grid, Typography} from '@mui/material';
import SingleQuiniela from '@/app/components/quinielas/SingleQuiniela';

import JornadaInfo from "@/app/components/JornadaInfo";


export default async function Quinielas () {
    let jornada = null;
    let quinielas = [];

    try {
        jornada = await fetchLatestJornadaServer();
        quinielas = await fetchQuinielasServer({ jornada: jornada.active });

    } catch (error) {
        console.error('Error fetching jornada:', error);
    }

    return (
        <Box padding={2}>
            {/*<ContactUs/>*/}
            {/*<BuyBanner cart={cart?cart:null} jornada={jornada?jornada:null}/>*/}
            <JornadaInfo jornada={jornada.active}/>
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



