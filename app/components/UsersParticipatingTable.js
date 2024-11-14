import React from 'react';

const UsersParticipatingTable = ({ users }) => {
    const generateSchemaMarkup = () => {
        const userEntries = users.map((user, index) => ({
            "@type": "Person",
            "name": user.username,
            "url": `https://www.quinielaligamx.com/user/${user.username}`,
            "address": {
                "@type": "Country",
                "name": user.country
            },
            // Removed 'owns' property to fix the error
        }));

        const schemaData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Participantes en la Quiniela Liga MX 2025",
            "itemListElement": userEntries.map((user, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": user
            }))
        };

        return { __html: JSON.stringify(schemaData) };
    };

    return (
        <div style={styles.container}>
            {/* Schema Markup */}
            <script type="application/ld+json" dangerouslySetInnerHTML={generateSchemaMarkup()} />

            {/* Table rendering */}
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
