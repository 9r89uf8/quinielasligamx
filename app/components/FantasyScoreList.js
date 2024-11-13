import React from 'react';

const FantasyScoreList = ({ scores }) => {
    const generateSchemaMarkup = () => {
        const itemListElements = scores.map((score, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Person",
                "name": score.user,
                "url": "https://www.quinielaligamx.com/user/" + score.user, // Assume each user has a unique profile link
                "description": `${score.gameName} - ${score.gameYear}`,
                "award": `${score.prize} ${score.currency}`,
                "country": score.country,
                "points": score.points
            }
        }));

        const schemaData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Quiniela liga mx 2025 Ganadores",
            "itemListElement": itemListElements
        };

        return { __html: JSON.stringify(schemaData) };
    };

    return (
        <div>
            {/* Schema Markup */}
            <script type="application/ld+json" dangerouslySetInnerHTML={generateSchemaMarkup()} />

            {/* List rendering */}
            <ul style={styles.list}>
                {scores.map((score, index) => (
                    <li
                        key={index}
                        style={{
                            ...styles.listItem,
                            background: getGradientBackground(index),
                        }}
                    >
                        <div style={styles.place}>{score.place}</div>
                        <div style={styles.userInfo}>
                            <h3 style={styles.username}>{score.user}</h3>
                            <p style={styles.gameName}>{score.gameName}</p>
                            <p style={styles.gameYear}>{score.gameYear}</p>
                            <p style={styles.gamePoints}>Puntos: {score.points}</p>
                            <p style={styles.gameCountry}>País: {score.country}</p>
                        </div>
                        <div style={styles.prizeContainer}>
                            <span style={styles.prizeLabel}>Premio</span>
                            <button style={styles.prizeButton}>{score.prize}</button>
                            <span style={styles.currency}>{score.currency}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Remaining styles and helper functions are unchanged


const getGradientBackground = (index) => {
    const gradients = [
        'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        'linear-gradient(135deg, #f5f7fa 0%, #e0c3fc 100%)',
        'linear-gradient(135deg, #c3cfe2 0%, #8ec5fc 100%)',
        'linear-gradient(135deg, #f5f7fa 0%, #8ec5fc 100%)',
    ];
    return gradients[index % gradients.length];
};

const styles = {
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        maxWidth: '600px',
        width: '100%',
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    place: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginRight: '15px',
        minWidth: '30px',
    },
    userInfo: {
        flex: 1,
    },
    username: {
        margin: '0 0 5px 0',
        fontSize: '21px',
        fontWeight: 'bold',
    },
    gameName: {
        margin: '0 0 3px 0',
        fontSize: '18px',
        color: '#333',
    },
    gameYear: {
        margin: '0 0 3px 0',
        fontSize: '18px',
        color: '#555',
    },
    gamePoints: {
        margin: '0 0 3px 0',
        fontSize: '18px',
        color: '#555',
    },
    gameCountry: {
        margin: 0,
        fontSize: '18px',
        color: '#555',
    },
    prizeContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    prizeLabel: {
        marginBottom: '5px',
        fontSize: '18px',
        color: '#2e2e2e',
    },
    prizeButton: {
        padding: '8px 12px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #495057 0%, #343a40 100%)',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
    },
    currency: {
        marginTop: '5px',
        fontSize: '18px',
        color: '#2e2e2e',
    },
};

export default FantasyScoreList;
