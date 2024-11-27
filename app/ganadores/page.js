'use client';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/app/store/store';
import { fetchQuinielasWinners } from '@/app/services/quinielasService';

const WinnerCard = ({ winner }) => {
    const date = new Date(
        winner.timestamp._seconds * 1000 + winner.timestamp._nanoseconds / 1e6
    );
    const formattedDate = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);

    return (
        <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            padding: '10px',
            marginBottom: '24px',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.2s ease-in-out',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
        }}
             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            {/* User name and flag section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '20px'
            }}>
                <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '12px'
                }}>{winner.user}</h3>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <img
                        src={winner.country==='US'?'https://chicagocarhelp.s3.us-east-2.amazonaws.com/EMELY+(7).png':'https://chicagocarhelp.s3.us-east-2.amazonaws.com/EMELY+(5).png'}
                        alt={`${winner.country} flag`}
                        style={{
                            borderRadius: '4px',
                            width: "auto",
                            height: '50px'
                        }}
                    />
                    <span style={{
                        fontSize: '16px',
                        color: '#666'
                    }}>{winner.country}</span>
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
                }}>${winner.country=== 'US'?winner.prize.toLocaleString():(winner.prize*15).toLocaleString()}</div>
                <div style={{
                    fontSize: '25px',
                    color: '#202020'
                }}>{winner.country==='US'?<span>dólares</span>:<span>pesos</span>}</div>
            </div>

            {/* Bottom row with points and date */}
            <div style={{textAlign: "center"}}>
                <div style={{
                    fontSize: '25px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'inline-block'
                }}>
                    <span style={{
                        color: '#0369a1',
                        fontWeight: '500'
                    }}>{winner.correctAmount} Puntos</span>
                </div>
            </div>
            {/* Bottom row with points and date */}
            <div style={{textAlign: "center"}}>
                <div style={{
                    fontSize: '21px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'inline-block'
                }}>
                    <span style={{
                        color: '#787878',
                        fontWeight: '500'
                    }}>{formattedDate}</span>
                </div>
            </div>
        </div>
    );
};

const WinnersDisplay = () => {
    const [visible, setVisible] = useState(5);
    const winners = useStore((state) => state.winners);

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                await fetchQuinielasWinners();
            } catch (error) {
                console.error('Error fetching winners:', error);
            }
        };

        fetchWinners();
    }, []);

    const showMoreItems = () => {
        setVisible(prevState => prevState + 2);
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '15px'
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
                maxHeight: '600px',
                overflowY: 'auto',
                padding: '16px',
                marginBottom: '24px'
            }}>
                {winners&&winners.slice(0, visible).map((winner, index) => (
                    <WinnerCard key={index} winner={winner} />
                ))}
            </div>

            {winners&&winners.length > visible && (
                <div style={{
                    textAlign: 'center'
                }}>
                    <button
                        onClick={showMoreItems}
                        style={{
                            background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease-in-out',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Mostrar más
                    </button>
                </div>
            )}
        </div>
    );
};

export default WinnersDisplay;
