// components/CheckoutButton.jsx
'use client';

import React, {useEffect} from 'react';
import { Button } from '@mui/material';
import {createCheckoutSession} from "@/app/services/stripeService";
import { useStore } from '@/app/store/store';

const CheckoutButton = ({user, country, price, jornadaId}) => {
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);
    const freeQuinielasAmount = useStore((state) => state.freeQuinielasAmount);
    const paymentData = { userId: user, country: country, price: price, jornadaId: jornadaId, free: freeQuinielasAmount};


    const handleCheckout = () => {
        createCheckoutSession(paymentData); // example amount
    };

    useEffect(() => {
        setLoading(false)
    }, []);

    return (
        <Button
            style={{
                backgroundImage: 'linear-gradient(45deg, #edf2fb, #d7e3fc)',
                color: 'black',
                padding: '10px 20px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 10
            }}
            onClick={handleCheckout}
            disabled={loading}
        >
            {loading ? 'Processing...' : 'Pagar'}
        </Button>
    );
};

export default CheckoutButton;

