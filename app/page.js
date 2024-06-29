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
                <div style={styles.card}>
                    <p style={styles.description}>
                        Si vives en Estados Unidos puedes ganar
                    </p>
                    <h3 style={{ ...styles.prize, ...styles.button }}>$10,000 dólares</h3>
                </div>
                <div style={styles.card}>
                    <p style={styles.description}>
                        Si vives en México puedes ganar
                    </p>
                    <h3 style={{ ...styles.prize, ...styles.button }}>$120,000 pesos</h3>
                </div>
                <Link href="/quinielas" passHref>
                    <button style={styles.buttonClick}>Juega Ahora</button>
                </Link>
            </div>
            <div style={styles.winnerSection}>
                <h2 style={styles.sectionTitle}>Ganadores Anteriores</h2>

                <div>
                    <div style={styles.playersCard}>
                        <p style={styles.playersName}>22,000</p>
                        <p style={styles.playersDescription}>Jugadores de Estados Unidos y México participando en nuestras quinielas.</p>
                    </div>
                </div>
                <div style={styles.winnerGrid}>
                    <div style={styles.winnerCard}>
                        <p style={styles.winnerName}>Carlos11S</p>
                        <p style={styles.winnerAmount}>Jornada 17, 2024</p>
                        <p style={styles.winnerFut}>Futbol Mexicano Clausura 2024</p>
                        <p style={styles.winnerAmount}>$18,000 dólares</p>
                    </div>
                    <div style={styles.winnerCard}>
                        <p style={styles.winnerName}>Mario_Rodríguez3</p>
                        <p style={styles.winnerAmount}>Jornada 17, 2024</p>
                        <p style={styles.winnerFut}>Futbol Mexicano Clausura 2024</p>
                        <p style={styles.winnerAmount}>$16,000 dólares</p>
                    </div>
                    <div style={styles.winnerCard}>
                        <p style={styles.winnerName}>Juan Pérez</p>
                        <p style={styles.winnerAmount}>Jornada 16, 2024</p>
                        <p style={styles.winnerFut}>Futbol Mexicano Clausura 2024</p>
                        <p style={styles.winnerAmount}>$12,000 dólares</p>
                    </div>
                    <div style={styles.winnerCard}>
                        <p style={styles.winnerName}>luisitoo2024</p>
                        <p style={styles.winnerAmount}>Jornada 15, 2024</p>
                        <p style={styles.winnerFut}>Futbol Mexicano Clausura 2024</p>
                        <p style={styles.winnerAmount}>$14,000 dólares</p>
                    </div>
                    <div style={styles.winnerCard}>
                        <p style={styles.winnerName}>Luis Martínez</p>
                        <p style={styles.winnerAmount}>Jornada 15, 2024</p>
                        <p style={styles.winnerFut}>Futbol Mexicano Clausura 2024</p>
                        <p style={styles.winnerAmount}>$10,000 dólares</p>
                    </div>
                </div>
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

            <div style={styles.teamsSection}>
                <h2 style={styles.sectionTitle}>Liga Mexicana BBVA MX Equipos 2024-2025</h2>
                <div style={styles.winnerGrid}>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>América</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Atlas</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Atlético de San Luis</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Tijuana</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Cruz Azul</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Guadalajara</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>FC Juarez</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>León</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Mazatlán FC</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Monterrey</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Necaxa</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Pachuca</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Puebla</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Pumas UNAM</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Querétaro</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Santos</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Tigres UANL</p>
                    </div>
                    <div style={styles.teamsCard}>
                        <p style={styles.teamName}>Toluca</p>
                    </div>

                </div>
            </div>

            <div style={styles.teamsSection}>
                <p style={styles.footer}>© 2024 - Todos los Derechos Reservados LIGA MX. Quinielas liga mx 2024-2025.</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f0f5',
        padding: '20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
        background: 'linear-gradient(135deg, #43c6ac, #191654)',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        maxWidth: '800px',
        width: '100%',
        marginBottom: '40px',
    },
    mainTitle: {
        fontSize: '3.5rem',
        fontWeight: '900',
        color: '#ffffff',
        marginBottom: '20px',
    },
    subtitle: {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '20px',
    },
    card: {
        background: 'linear-gradient(45deg, #e9ecef, #f8f9fa)',
        color: '#000000',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    description: {
        fontSize: '1.55rem',
        marginBottom: '10px',
        color: '#050505',
    },
    prize: {
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '10px',
        color: '#ffffff',
    },
    button: {
        fontSize: '2rem',
        color: '#383838',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
    },
    buttonClick: {
        fontSize: '1.25rem',
        padding: '15px 30px',
        background: 'linear-gradient(45deg, #0077b6, #00b4d8)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
    },
    buttonHover: {
        background: 'linear-gradient(45deg, #00b4d8, #0077b6)',
    },
    playerSection: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
        marginBottom: '40px',
        textAlign: 'center',
    },
    winnerSection: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
        marginBottom: '40px',
        textAlign: 'center',
    },
    teamsSection: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
        marginBottom: '40px',
        marginTop:'40px',
        textAlign: 'center',
    },
    winnerGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
    },
    winnerCard: {
        backgroundColor: '#212529',
        padding: '5px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    teamsCard: {
        background: 'linear-gradient(45deg, #0d1b2a, #0b090a)',
        padding: '5px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    teamName: {
        fontSize: '1.4rem',
        fontWeight: '500',
        color: '#d5d5d5',
    },
    footer: {
        fontSize: '1.4rem',
        fontWeight: '500',
        color: '#212121',
    },
    playersCard: {
        backgroundColor: '#ffffff',
        padding: '5px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        marginBottom: 40
    },
    winnerName: {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: '#d5d5d5',
    },
    playersName: {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#505050',
    },
    winnerAmount: {
        fontSize: '1.55rem',
        color: '#c7c7c7',
    },
    winnerFut: {
        fontSize: '1.25rem',
        color: '#c7c7c7',
        marginTop: -12
    },
    playersDescription: {
        fontSize: '1.35rem',
        fontWeight: '700',
        color: '#232323',
    },
    content: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
    },
    sectionTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#002366',
        marginBottom: '20px',
    },
    text: {
        fontSize: '1.5rem',
        color: '#666',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        marginBottom: '20px',
    },
    listItem: {
        fontSize: '1.5rem',
        color: '#666',
        marginBottom: '10px',
    },
};

export default HomePage;









