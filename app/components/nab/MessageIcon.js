import React from 'react';

const PlusIcon = () => {
    const greenColor = '#10b981';

    return (
        <div style={{ height: 100 }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                style={{ width: '100%', height: '100%' }}
            >
                <circle cx="50" cy="50" r="40" fill={greenColor} opacity="0.2">
                    <animate
                        attributeName="r"
                        values="40;45;40"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.2;0.1;0.2"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </circle>

                <circle cx="50" cy="50" r="35" fill={greenColor} />

                {/* Plus sign */}
                <path
                    d="M35 47.5 L65 47.5 M50 32.5 L50 62.5"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-width"
                        values="6;7;6"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div>
    );
};

export default PlusIcon;