import React from 'react';
import Link from 'next/link';


const HomePage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.mainTitle}>Quinielas Liga MX</h1>
                <h2 style={styles.subtitle}>2024-2025</h2>
                <p style={styles.description}>
                    ¿Te gusta el fútbol o eres bueno adivinando los ganadores de los partidos de la Liga MX? Participa en nuestras quinielas y demuestra tu conocimiento.
                </p>
                <p style={styles.description}>
                    Si vives en Estados Unidos puedes ganar:
                </p>
                <h3 style={styles.prize}>10,000 dólares</h3>
                <p style={styles.description}>
                    Si vives en México puedes ganar:
                </p>
                <h3 style={styles.prize}>120,000 pesos</h3>
                <p style={styles.description}>
                    Disponible solo para jugadores en Estados Unidos y México.
                </p>
                <Link href="/quinielas" passHref>
                    <button style={styles.button}>Juega Ahora</button>
                </Link>
            </div>
            <div style={styles.content}>
                <h2 style={styles.sectionTitle}>¿Cómo Funciona?</h2>
                <p style={styles.text}>
                    Participar en nuestras quinielas es muy fácil. Simplemente regístrate, selecciona los resultados de los partidos de la Liga MX y compite contra otros aficionados. Los jugadores con más aciertos ganan premios en efectivo.
                </p>
                <h2 style={styles.sectionTitle}>Beneficios de Participar</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}>Premios en efectivo para los ganadores</li>
                    <li style={styles.listItem}>Participación gratuita para los primeros 100 inscritos</li>
                    <li style={styles.listItem}>Actualizaciones en tiempo real de los resultados</li>
                    <li style={styles.listItem}>Acceso a una comunidad de aficionados al fútbol mexicano</li>
                </ul>
                <h2 style={styles.sectionTitle}>Testimonios</h2>
                <p style={styles.text}>
                    "Gracias a las quinielas de la Liga MX gané 7,000 dólares. ¡Es increíble!" - Juan Pérez
                </p>
                <p style={styles.text}>
                    "Participar en las quinielas es muy divertido y emocionante. ¡Recomiendo a todos los aficionados!" - María López
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f9',
        padding: '20px',
    },
    header: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
        marginBottom: '20px',
    },
    mainTitle: {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: '1rem',
    },
    subtitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: '1rem',
    },
    description: {
        fontSize: '1.25rem',
        color: '#555',
        marginBottom: '1.5rem',
    },
    prize: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#0077b6',
        marginBottom: '1.5rem',
    },
    button: {
        fontSize: '1.25rem',
        padding: '0.75rem 2rem',
        background: 'linear-gradient(45deg, #0077b6, #023e8a)',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    content: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
    },
    sectionTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: '1rem',
    },
    text: {
        fontSize: '1.25rem',
        color: '#555',
        marginBottom: '1.5rem',
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        marginBottom: '1.5rem',
    },
    listItem: {
        fontSize: '1.25rem',
        color: '#555',
        marginBottom: '0.5rem',
    },
};

export default HomePage;




