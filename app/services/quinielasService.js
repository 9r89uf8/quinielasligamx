// services/quinielasService.js
import { useStore } from '../store/store'; // Ensure you import the correct store

// Fetch all quinielas from the API
export const fetchQuinielas = async (formData) => {
    const setQuinielas = useStore.getState().setQuinielas;
    const setLoadingQuinielas = useStore.getState().setLoadingQuinielas;

    setLoadingQuinielas(true);

    try {
        const response = await fetch('/api/quinielas/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const quinielas = await response.json();
            setQuinielas(quinielas);
            return quinielas;
        } else {
            throw new Error('Failed to fetch quinielas');
        }
    } catch (error) {
        console.error('Error fetching quinielas:', error);
        return [];
    } finally {
        setLoadingQuinielas(false);
    }
};

// Fetch quinielas by points from the API
export const fetchQuinielasByPoints = async (formData) => {
    const setQuinielas = useStore.getState().setQuinielas;
    const setLoadingQuinielas = useStore.getState().setLoadingQuinielas;

    setLoadingQuinielas(true);

    try {
        const response = await fetch('/api/quinielas/points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const quinielas = await response.json();
            setQuinielas(quinielas);
            return quinielas;
        } else {
            throw new Error('Failed to fetch quinielas');
        }
    } catch (error) {
        console.error('Error fetching quinielas:', error);
        return [];
    } finally {
        setLoadingQuinielas(false);
    }
};

// Fetch free quinielas from the API
export const fetchFreeQuinielas = async (formData) => {
    const setUserQuinielas = useStore.getState().setUserQuinielas;
    const setLoadingQuinielas = useStore.getState().setLoadingQuinielas;

    setLoadingQuinielas(true);

    try {
        const response = await fetch('/api/quinielas/free', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const quinielas = await response.json();
            setUserQuinielas(quinielas);
            return quinielas;
        } else {
            throw new Error('Failed to fetch free quinielas');
        }
    } catch (error) {
        console.error('Error fetching free quinielas:', error);
        return [];
    } finally {
        setLoadingQuinielas(false);
    }
};


// Fetch user quinielas from the API
export const fetchUserQuinielasByJornadaId = async (formData) => {
    const setUserQuinielas = useStore.getState().setUserQuinielas;
    const setJornada = useStore.getState().setJornada
    const setQuinielas = useStore.getState().setQuinielas
    const setLoadingQuinielas = useStore.getState().setLoadingQuinielas;

    setLoadingQuinielas(true);

    try {
        const response = await fetch('/api/quinielas/byJornada', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const quinielas = await response.json();
            setUserQuinielas(quinielas.userQuinielas);
            setJornada(quinielas.jornada)
            setQuinielas(quinielas.quinielas)
            return quinielas;
        } else {
            throw new Error('Failed to fetch user quinielas');
        }
    } catch (error) {
        console.log(error.message)
        console.error('Error fetching user quinielas:', error);
        return [];
    } finally {
        setLoadingQuinielas(false);
    }
};



// Fetch user quinielas from the API
export const fetchUserQuinielas = async (formData) => {
    const setUserQuinielas = useStore.getState().setUserQuinielas;
    const setLoadingQuinielas = useStore.getState().setLoadingQuinielas;

    setLoadingQuinielas(true);

    try {
        const response = await fetch('/api/quinielas/byUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const quinielas = await response.json();
            setUserQuinielas(quinielas);
            return quinielas;
        } else {
            throw new Error('Failed to fetch user quinielas');
        }
    } catch (error) {
        console.error('Error fetching user quinielas:', error);
        return [];
    } finally {
        setLoadingQuinielas(false);
    }
};

// Fetch quinielas winners from the API
export const fetchQuinielasWinners = async (formData) => {
    const setWinners = useStore.getState().setWinners;
    const setLoadingQuinielas = useStore.getState().setLoadingQuinielas;

    setLoadingQuinielas(true);

    try {
        const response = await fetch('/api/quinielas/winners', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const winners = await response.json();
            setWinners(winners);
            return winners;
        } else {
            throw new Error('Failed to fetch quinielas winners');
        }
    } catch (error) {
        console.error('Error fetching quinielas winners:', error);
        return [];
    } finally {
        setLoadingQuinielas(false);
    }
};

// Create a new quiniela
export const createQuiniela = async (formData) => {
    const addQuiniela = useStore.getState().addQuiniela;
    const setLoadingQuinielas = useStore.getState().setLoadingQuinielas;
    const getUserCart = useStore.getState().setLoadingGetUserCart;

    setLoadingQuinielas(true);

    try {
        const response = await fetch('/api/quinielas/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const newQuiniela = await response.json();
            // getUserCart(true);
            return newQuiniela;
        } else {
            throw new Error('Failed to create quiniela');
        }
    } catch (error) {
        console.log(error.message);
        return null;
    } finally {
        setLoadingQuinielas(false);
    }
};


export const addDummyQuinielas = async (formData) => {
    const dummy = useStore.getState().setDummy;
    try {
        dummy(true)
        const response = await fetch('/api/quinielas/dummy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            dummy(false)
            const newQuiniela = await response.json();
            // getUserCart(true);
            return newQuiniela;
        } else {
            dummy(false)
            throw new Error('Failed to create dummy quiniela');
        }
    } catch (error) {
        dummy(false)
        console.log(error.message);
        return null;
    }
};

export const addDummyQuinielaWinners = async (formData) => {
    const dummy = useStore.getState().setDummy;
    try {
        dummy(true)
        const response = await fetch('/api/jornada/dummyWinners', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            dummy(false)
            const newQuiniela = await response.json();
            // getUserCart(true);
            return newQuiniela;
        } else {
            dummy(false)
            throw new Error('Failed to create dummy quiniela');
        }
    } catch (error) {
        dummy(false)
        console.log(error.message);
        return null;
    }
};


export const deleteAllQuinielasByJornadaId = async (formData) => {
    const dummy = useStore.getState().setDummy;

    try {
        dummy(true)
        const response = await fetch('/api/quinielas/deleteAllByJornadaId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            dummy(false)
            const newQuiniela = await response.json();
            // getUserCart(true);
            return newQuiniela;
        } else {
            dummy(false)
            throw new Error('Failed to create dummy quiniela');
        }
    } catch (error) {
        dummy(false)
        console.log(error.message);
        return null;
    }
};
// Delete a quiniela
export const deleteQuiniela = async (id) => {

    try {
        const response = await fetch(`/api/quinielas/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return { id };
        } else {
            throw new Error('Failed to delete quiniela');
        }
    } catch (error) {
        console.error('Error deleting quiniela:', error);
        return null;
    }
};

