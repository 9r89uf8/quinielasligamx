// JornadaDataProvider.js (Client Component)
'use client';

import { useEffect, useState } from 'react';
import { fetchLatestJornada } from "@/app/services/jornadaService";
import { fetchQuinielas } from "@/app/services/quinielasService";

export function JornadaDataProvider({ children }) {
    const [jornada, setJornada] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadJornadaAndQuinielas = async () => {
            try {
                const latestJornada = await fetchLatestJornada();
                await fetchQuinielas({ jornada: latestJornada.active });
                setJornada(latestJornada);
            } catch (error) {
                console.error('Error loading jornada and quinielas:', error);
            } finally {
                setLoading(false);
            }
        };

        loadJornadaAndQuinielas();
    }, []);

    // You can add loading state handling here if needed
    if (loading) {
        return children(null);
    }

    return children(jornada);
}