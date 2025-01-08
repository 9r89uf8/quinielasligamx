// services/jornadaService.js
import { useStore } from '../store/store'; // Ensure you import the correct store

export const fetchLatestJornada = async () => {
    const setJornada = useStore.getState().setJornada;
    const setBuyJornada = useStore.getState().setBuyJornada;

    try {
        const response = await fetch(`/api/jornada/get`, {
            method: 'GET',
            cache: 'no-store'
        });
        if (response.ok) {
            const data = await response.json();
            const { active, buy } = data;
            setJornada(active);
            setBuyJornada(buy);
            return data;
        } else {
            throw new Error('Failed to fetch the latest jornada/no/server');
        }
    } catch (error) {
        console.error('Error fetching the latest jornada/no/server:', error.message);
        return null;
    }
};

export const fetchLatestJornadaServer = async () => {
    try {
        const baseUrl = process.env.NODE_ENV==="testing"? 'http://localhost:3000': 'https://www.quinielaligamx.com'
        const response = await fetch(`http://localhost:3000/api/jornada/get`, {
            method: 'GET'
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch the latest jornada/server');
        }
    } catch (error) {
        console.error('Error fetching the latest jornada/server', error.message);
        return null;
    }
};

export const fetchAllJornadas = async () => {
    const setJornadas = useStore.getState().setJornadas;

    try {
        const response = await fetch('/api/jornada/all', {
            method: 'GET',
            cache: 'no-store'
        });
        if (response.ok) {
            const jornadas = await response.json();
            setJornadas(jornadas);
            return jornadas;
        } else {
            throw new Error('Failed to fetch all jornadas');
        }
    } catch (error) {
        console.error('Error fetching all jornadas:', error);
        return null;
    }
};

export const addJornada = async (formData) => {
    try {
        const response = await fetch('/api/jornada/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const newJornada = await response.json();
            return newJornada;
        } else {
            throw new Error('Failed to create jornada');
        }
    } catch (error) {
        console.error('Error creating jornada:', error);
        return null;
    }
};

export const updateJornada = async (formData) => {
    const setJornada = useStore.getState().setJornada;

    try {
        const response = await fetch('/api/jornada/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const updatedJornada = await response.json();
            setJornada(updatedJornada);
            return updatedJornada;
        } else {
            throw new Error('Failed to update jornada');
        }
    } catch (error) {
        console.error('Error updating jornada:', error);
        return null;
    }
};

export const refundJornada = async (formData) => {
    const setJornada = useStore.getState().setJornada;

    try {
        const response = await fetch('/api/jornada/refund', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const refundedJornada = await response.json();
            setJornada(refundedJornada);
            return refundedJornada;
        } else {
            throw new Error('Failed to refund jornada');
        }
    } catch (error) {
        console.error('Error refunding jornada:', error);
        return null;
    }
};

export const updateJornadaScore = async (formData) => {
    const setJornada = useStore.getState().setJornada;
    const setLoading = useStore.getState().setLoadingJornada;

    setLoading(true);

    try {
        const response = await fetch('/api/jornada/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const updatedJornada = await response.json();
            setJornada(updatedJornada);
            setLoading(false);
            return updatedJornada;
        } else {
            throw new Error('Failed to update jornada score');
        }
    } catch (error) {
        setLoading(false);
        console.error('Error updating jornada score:', error);
        return null;
    }
};

export const deleteJornada = async (id) => {
    try {
        const response = await fetch(`/api/jornada/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return { id };
        } else {
            throw new Error('Failed to delete jornada');
        }
    } catch (error) {
        console.error('Error deleting jornada:', error);
        return null;
    }
};

export const fetchJornadaById = async (id) => {
    const setJornada = useStore.getState().setJornada;

    try {
        const response = await fetch(`/api/jornada/one/${id}`);
        if (response.ok) {
            const jornada = await response.json();
            setJornada(jornada);
            return jornada;
        } else {
            throw new Error('Failed to fetch jornada by id');
        }
    } catch (error) {
        console.error('Error fetching jornada by id:', error);
        return null;
    }
};

