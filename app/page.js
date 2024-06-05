import React from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import Link from 'next/link';

export const metadata = {
    title: 'Quinielas - Win Up to $8,000 or 120,000 Pesos!',
    description: 'Play Quinielas and win real money! Available for players in the USA and Mexico only.',
};

const HomePage = () => {
    return (
        <Container maxWidth="md" style={styles.container}>
            <Box style={styles.header}>
                <Typography variant="h2" component="h1" style={styles.title}>
                    Welcome to Quinielas!
                </Typography>
                <Typography variant="body1" style={styles.description}>
                    Play Quinielas and win real money! Up to $8,000 or 120,000 Pesos.
                    Available for players in the USA and Mexico only.
                </Typography>
                <Link href="/quinielas" passHref>
                    <Button variant="contained" color="primary" style={styles.button}>
                        Play Now
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: 20
    },
    header: {
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#003366',
    },
    description: {
        fontSize: '1.25rem',
        marginBottom: '2rem',
        color: '#555',
    },
    button: {
        fontSize: '1.25rem',
        padding: '0.75rem 2rem',
        background: 'linear-gradient(45deg, #0077b6, #023e8a)',
        color: '#fff',
    },
};

export default HomePage;


