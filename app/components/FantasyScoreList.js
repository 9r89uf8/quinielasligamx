import React from 'react';

const ScoreCard = ({ score }) => {
    return (
        <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            marginBottom: '24px',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.2s ease-in-out',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
        }}
        >
            {/* User name and country section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '20px'
            }}>
                <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '12px'
                }}>{score.user}</h3>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <img
                        src={score.country === 'US' ?
                            'https://chicagocarhelp.s3.us-east-2.amazonaws.com/EMELY+(7).png' :
                            'https://chicagocarhelp.s3.us-east-2.amazonaws.com/EMELY+(5).png'}
                        alt={`${score.country} flag`}
                        style={{
                            borderRadius: '4px',
                            height: '50px',
                            width: 'auto'
                        }}
                    />
                    <span style={{
                        fontSize: '16px',
                        color: '#666'
                    }}>{score.country}</span>
                </div>
            </div>

            {/* Prize amount section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '24px'
            }}>
                <div style={{
                    fontSize: '40px',
                    fontWeight: '700',
                    color: '#2563eb',
                    marginBottom: '4px'
                }}>
                    ${score.prize}
                </div>
                <div style={{
                    fontSize: '25px',
                    color: '#202020'
                }}>
                    {score.currency}
                </div>
            </div>

            {/* Game info and points */}
            <div style={{textAlign: 'center'}}>
                <div style={{
                    fontSize: '25px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                }}>
                    <span style={{
                        color: '#494949',
                        fontWeight: '500'
                    }}>{score.date}</span>
                </div>
            </div>


            {/* Game info and points */}
            <div style={{textAlign: 'center'}}>
                <div style={{
                    fontSize: '25px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                }}>
                    <span style={{
                        color: '#0369a1',
                        fontWeight: '500'
                    }}>{score.points} Puntos</span>
                </div>
            </div>

        </div>
    );
};

const FantasyScoreList = ({scores = []}) => {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '5px'
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #02c39a 0%, #1d4ed8 100%)',
                borderRadius: '16px',
                padding: '32px',
                color: 'white',
                marginBottom: '32px',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
            }}>
                <h1 style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    marginBottom: '16px',
                    textAlign: 'center'
                }}>Ganadores Recientes</h1>
                <div style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    opacity: '0.9'
                }}>
                    Premios Otorgados en 2024-2025
                </div>
                <div style={{
                    fontSize: '64px',
                    fontWeight: '700',
                    textAlign: 'center',
                    marginTop: '16px',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    $860,000 dólares
                </div>
            </div>

            <div style={{
                padding: '16px'
            }}>
                {scores.map((score, index) => (
                    <ScoreCard key={index} score={score} />
                ))}
            </div>
        </div>
    );
};

export default FantasyScoreList;


