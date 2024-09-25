import React from 'react';

const UsersParticipatingTable = ({ users }) => {
    return (
        <div style={styles.container}>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Username</th>
                    <th style={styles.th}>Pais</th>
                    <th style={styles.th}>Quinielas Compradas</th>

                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user.username} style={styles.tr}>
                        <td style={styles.td}>{user.username}</td>
                        <td style={styles.td}>{user.country}</td>
                        <td style={styles.td}>{user.purchase}</td>
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

export default UsersParticipatingTable;