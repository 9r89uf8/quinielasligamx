import React from 'react';
import Link from 'next/link';
import FantasyScoreList from "@/app/components/FantasyScoreList";
import TeamStandingsTable from "@/app/components/TeamStandingsTable";
import UsersParticipatingTable from "@/app/components/UsersParticipatingTable";

const fantasyScores = [
    { place: 1, user: "Carlos11S", gameName: "Jornada 17",gameYear: "Liga MX, 2024", points: 9, country: 'México', prize: '150.000', currency: 'pesos'},
    { place: 2, user: "Mario_Ro3", gameName: "Jornada 17", gameYear: "Liga MX, 2024", points: 9, country: 'Estados Unidos', prize: '10,000', currency: 'dólares'},
    { place: 3, user: "Juan Pérez", gameName: "Jornada 16", gameYear: "Liga MX, 2024", points: 9, country: 'México', prize: '150.000', currency: 'pesos'},
    { place: 4, user: "luisitoo2024", gameName: "Jornada 15", gameYear: "Liga MX, 2024", points: 9, country: 'México', prize: '150.000', currency: 'pesos'},
    { place: 5, user: "Luis Martínez", gameName: "Jornada 15", gameYear: "Liga MX, 2024", points: 9, country: 'Estados Unidos', prize: '10,000', currency: 'dólares'},
];

const teams = [
    { name: "1. Cruz Azul", played: 9, won: 7, lost: 2, drawn: 1, points: 22 },
    { name: "2. Tigres UANL", played: 9, won: 6, lost: 3, drawn: 1, points: 20 },
    { name: "3. Monterrey", played: 10, won: 7, lost: 2, drawn: 1, points: 20 },
    { name: "4. Toluca", played: 9, won: 6, lost: 3, drawn: 1, points: 18 },
    { name: "5. Pumas UNAM", played: 9, won: 7, lost: 2, drawn: 1, points: 16 },
    { name: "6. Guadalajara", played: 9, won: 6, lost: 3, drawn: 1, points: 14 },
    { name: "7. San Luis", played: 9, won: 7, lost: 2, drawn: 1, points: 14 },
    { name: "8. Atlas", played: 9, won: 6, lost: 3, drawn: 1, points: 14 },
    { name: "9. Club Tijuana", played: 9, won: 7, lost: 2, drawn: 1, points: 14 },
    { name: "10. Club América", played: 9, won: 7, lost: 2, drawn: 1, points: 13 },
    { name: "11. Necaxa", played: 9, won: 6, lost: 3, drawn: 1, points: 12 },
    { name: "12. Puebla", played: 10, won: 7, lost: 2, drawn: 1, points: 11 },
    { name: "13. Pachuca", played: 9, won: 6, lost: 3, drawn: 1, points: 9 },
    { name: "14. Santos Laguna", played: 9, won: 7, lost: 2, drawn: 1, points: 8 },
    { name: "15. Mazatlán", played: 9, won: 6, lost: 3, drawn: 1, points: 7 },
    { name: "16. León", played: 9, won: 7, lost: 2, drawn: 1, points: 7 },
    { name: "17. Querétaro", played: 10, won: 6, lost: 3, drawn: 1, points: 7 },
    { name: "18. Juárez", played: 9, won: 7, lost: 2, drawn: 1, points: 4 },
];

const users = [
    { username: "1. Carlos123", country: 'México', purchase: 12 },
    { username: "2. LunaBella", country: 'Estados Unidos', purchase: 4 },
    { username: "3. SolAmigo9", country: 'México', purchase: 5 },
    { username: "4. Marinero1", country: 'Estados Unidos', purchase: 10 },
    { username: "5. CocoLoco", country: 'México', purchase: 20 },
    { username: "6. Pepe77", country: 'México', purchase: 6 },
    { username: "7. Lalo1234", country: 'Estados Unidos', purchase: 2 },
    { username: "8. TitoPerez", country: 'Estados Unidos', purchase: 1 },
    { username: "9. Memo001", country: 'Estados Unidos', purchase: 2 },
    { username: "10. Chuyito", country: 'México', purchase: 4 }
];


const HomePage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.mainTitle}>Quiniela Liga MX 2025</h1>
                <p style={styles.description}>
                    ¡Participa en la mejor quiniela de la Liga MX 2025 y gana dinero real! ¿Eres un experto en
                    fútbol de la liga BBVA MX y tienes un
                    don para predecir los resultados? Demuestra tu conocimiento en nuestras quiniela de
                    la Liga MX. Tenemos lo que necesitas para poner a prueba tus habilidades y
                    disfrutar al máximo cada jornada del torneo.
                </p>
                <div style={styles.card}>
                    <p style={styles.description}>
                        Si vives en Estados Unidos puedes ganar
                    </p>
                    <h3 style={{...styles.prize, ...styles.button}}>$10,000 dólares</h3>
                </div>
                <div style={styles.card}>
                    <p style={styles.description}>
                        Si vives en México puedes ganar
                    </p>
                    <h3 style={{...styles.prize, ...styles.button}}>$150.000 pesos</h3>
                </div>
                <Link href="/buy" passHref>
                    <button style={styles.buttonClick}>Comprar Quiniela</button>
                </Link>

                <div style={styles.cardMessage}>
                    <p style={styles.description}>
                        Tiene alguna pregunta?
                    </p>
                    <Link href="/chat" passHref>
                        <button style={styles.buttonClickMessage}>Mandar Mensaje</button>
                    </Link>
                </div>

            </div>
            <div style={styles.contentTwo}>
                <h2 style={styles.sectionTitle}>Ganadores Recientes</h2>
                <div style={styles.playersCard}>
                    <p style={styles.playersDescription}>Jugadores de Estados Unidos y México</p>
                </div>
                <FantasyScoreList scores={fantasyScores}/>
            </div>

            <div style={styles.contentTwo}>
                <h2 style={styles.sectionTitle}>Tabla General</h2>

                <div style={styles.playersCard}>
                    <p style={styles.playersDescription}>Liga BBVA MX Standings 2025</p>
                </div>
                <TeamStandingsTable teams={teams}/>
            </div>

            <div style={styles.contentTwo}>
                <h2 style={styles.sectionTitle}>Usuarios Activos</h2>

                <div style={styles.playersCard}>
                    <p style={styles.playersDescription}>Jugadores de Estados Unidos y México participando en nuestras
                        quinielas.</p>
                    <p style={styles.playersName}>22,000</p>
                </div>
                <UsersParticipatingTable users={users}/>
            </div>

            <div style={styles.content}>
                <h2 style={styles.sectionTitle}>¿Cómo Funciona?</h2>
                <p style={styles.text}>
                    Participar en nuestras quinielas es muy fácil. Simplemente regístrate, selecciona los resultados de
                    los partidos de la Liga MX y compite contra otros aficionados. Los jugadores con más aciertos ganan
                    premios en efectivo.
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
                    "Participar en las quinielas es muy divertido y emocionante. ¡Recomiendo a todos los aficionados!" -
                    María López
                </p>
            </div>

            <div style={styles.teamsSection}>
                <p style={styles.footer}>© 2025 - Todos los Derechos Reservados LIGA MX. Quiniela liga mx 2025.</p>
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
    cardMessage: {
        background: 'linear-gradient(45deg, #edf2fb, #e2eafc)',
        color: '#000000',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
        marginBottom: '20px',
        marginTop:20,
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
        fontSize: '1.65rem',
        padding: '15px 30px',
        background: 'linear-gradient(45deg, #0077b6, #00b4d8)',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
        margin: '10px auto 10px auto'
    },
    buttonClickMessage: {
        fontSize: '1.25rem',
        padding: '15px 30px',
        background: 'linear-gradient(45deg, #001f54, #0a1128)',
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
        margin: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: '32px',
        marginBottom: '10px',
        color: '#002366',
        fontWeight: '700',
    },
    playersCard: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    playersName: {
        fontSize: '35px',
        fontWeight: 'bold',
        margin: '0',
    },
    playersDescription: {
        fontSize: '18px',
        color: '#555',
        margin: '5px 0 0 0',
    },
    winnerTable: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    winnerTableTh: {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
        fontWeight: 'bold',
    },
    winnerTableTd: {
        border: '1px solid #ddd',
        padding: '12px',
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
        background: 'white',
        padding: '5px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    teamName: {
        fontSize: '1.4rem',
        fontWeight: '500',
        color: '#0a0a0a',
    },
    footer: {
        fontSize: '1.4rem',
        fontWeight: '500',
        color: '#212121',
    },
    winnerName: {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: '#d5d5d5',
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
    content: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
        marginBottom: 30
    },
    contentTwo: {
        backgroundColor: '#ffffff',
        padding: '5px',
        borderRadius: '10px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
        marginBottom: 30
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









