import React from 'react';

const TeamStandingsTable = ({ teams }) => {
    return (
        <div style={styles.container}>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Club</th>
                    <th style={styles.th}>MP</th>
                    <th style={styles.th}>W</th>
                    <th style={styles.th}>L</th>
                    <th style={styles.th}>D</th>
                    <th style={styles.th}>Pts</th>
                </tr>
                </thead>
                <tbody>
                {teams.map((team, index) => (
                    <tr key={team.name} style={styles.tr}>
                        <td style={styles.td}>{team.name}</td>
                        <td style={styles.td}>{team.played}</td>
                        <td style={styles.td}>{team.won}</td>
                        <td style={styles.td}>{team.lost}</td>
                        <td style={styles.td}>{team.drawn}</td>
                        <td style={styles.td}>{team.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        padding: 0,
        margin: 0
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#f5f7fa',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    th: {
        backgroundColor: '#495057',
        color: '#ffffff',
        padding: '12px',
        textAlign: 'left',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    tr: {
        borderBottom: '1px solid #e0e0e0',
    },
    td: {
        padding: '12px',
        fontSize: '14px',
        color: '#333',
    },
};

export default TeamStandingsTable;