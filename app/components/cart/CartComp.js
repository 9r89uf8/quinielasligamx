// components/Cart.js
//next js component that displays the total
'use client';

import React from 'react';
import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box, Divider,
} from '@mui/material';
import { useStore } from '@/app/store/store';
import { deleteQuiniela } from '@/app/services/quinielasService';
import Link from "next/link";
import CheckoutButton from "@/app/components/CheckoutButton";
import FreeQuinielasButton from "@/app/components/FreeQuinielasButton";

const PrizeCard = ({ country, children }) => {
    let background;
    let flagColors;

    if (country === 'USA') {
        background = 'linear-gradient(135deg, #495057, #343a40)';
        flagColors = ['#00509d', '#FFFFFF', '#d90429']; // Blue, White, Red stripes
    } else if (country === 'México') {
        background = 'linear-gradient(135deg, #495057, #343a40)';
        flagColors = ['#006847', '#FFFFFF', '#CE1126']; // Green, White, Red stripes
    } else {
        background = '#f1f1f1';
        flagColors = [];
    }

    return (
        <Paper
            sx={{
                background: 'linear-gradient(135deg, #343a40, #212529)', // Dark background
                padding: -10,
                border: '8px solid #343a40', // Gold border
                borderRadius: 2,
                marginBottom: 2.5,
                textAlign: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Content with some padding to avoid overlapping the flag bar */}
            <Box sx={{ mt: 2 }}>
                {children}
            </Box>
        </Paper>
    );
};

const Cart = () => {
    const cart = useStore((state) => state.cart);
    const user = useStore((state) => state.user);
    const jornada = useStore((state) => state.jornada);
    const buyJornada = useStore((state) => state.buyJornada);
    const loadingCart = useStore((state) => state.loadingCart);
    const freeQuinielasAmount = useStore((state) => state.freeQuinielasAmount);

    // Calculate free and paid quinielas
    const totalQuinielasInCart = cart.length;
    const freeQuinielasAvailable = freeQuinielasAmount || 0;
    const freeQuinielasUsed = Math.min(freeQuinielasAvailable, totalQuinielasInCart);
    const paidQuinielas = totalQuinielasInCart - freeQuinielasUsed;

    const calculateTotal = () => {
        return paidQuinielas * pricePerQuiniela;
    };


    const handleRemoveFromCart = async (id) => {
        try {
            await deleteQuiniela(id);
            // Update the store here after deletion
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const isUserRegistered = user && user.uid;
    const isCartEmpty = !cart || cart.length === 0;
    const country = user && user.country ? user.country : 'MX'; // default to MX
    const pricePerQuiniela = country === 'US' ? 3 : 45; // Assuming prices
    const currency = country === 'US' ? 'USD' : 'MXN';

    return (
        <Box
            sx={{
                padding: '20px',
                borderRadius: 5,
                background: 'linear-gradient(45deg, #0466c8 30%, #2575fc 90%)',
            }}
        >
            {isCartEmpty || !isUserRegistered ? (
                <>
                    <PrizeCard country="México">
                        <Typography variant="h6" gutterBottom style={{color: 'white'}}>
                            Si vives en México
                        </Typography>
                        <Divider sx={{ my: 1, borderColor: '#595959' }}/>
                        <Typography variant="h6" sx={{mb: 2}} style={{color: 'white'}}>
                            1 quiniela cuesta $45 pesos
                        </Typography>
                    </PrizeCard>
                    <PrizeCard country="México">
                        <Typography variant="h6" gutterBottom style={{color: 'white'}}>
                            Si vives en Estados Unidos
                        </Typography>
                        <Divider sx={{ my: 1, borderColor: '#595959' }}/>
                        <Typography variant="h6" sx={{mb: 2}} style={{color: 'white'}}>
                            1 quiniela cuesta $3 dólares
                        </Typography>
                    </PrizeCard>
                    <div>
                        {!isUserRegistered && (
                            <>
                                <Typography variant="h6" sx={{ marginTop: '10px', textAlign: 'center' }}>
                                    Regístrate para comprar quinielas
                                </Typography>
                                <div style={{textAlign: "center", marginTop: 5}}>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href="/register"
                                        sx={{
                                            color: 'black',
                                            textAlign: 'center',
                                            fontWeight: '700',
                                            bgcolor: 'rgb(255,255,255)',
                                            backdropFilter: 'blur(2px)',
                                            '&:hover': {
                                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                            },
                                            px: 4,
                                            py: 1
                                        }}
                                    >
                                        Crear Cuenta
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </>

            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Quinielas</TableCell>
                                    <TableCell align="right">Precio</TableCell>
                                    <TableCell align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle1">#{index + 1}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            ${item.price} {country === 'US' ? 'dólares' : 'pesos'}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleRemoveFromCart(item.id)}
                                                disabled={loadingCart}
                                            >
                                                {loadingCart ? 'Cargando...' : 'Eliminar'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
                        {user && freeQuinielasAmount>0 &&(
                            <Typography variant="h5" sx={{ color: 'white' }}>
                                Quinielas Gratis: {freeQuinielasAmount}
                            </Typography>
                        )}
                        <Typography variant="h5" sx={{ color: 'white' }}>
                            Total: ${calculateTotal().toFixed(2)} {currency}
                        </Typography>
                        {calculateTotal()===0?
                            <FreeQuinielasButton price={buyJornada ? buyJornada.price : jornada.price} country={user.country} user={user.uid} jornadaId={buyJornada ? buyJornada.id : jornada.id} />
                            :
                            <CheckoutButton price={buyJornada ? buyJornada.price : jornada.price} country={user.country} user={user.uid} jornadaId={buyJornada ? buyJornada.id : jornada.id}/>
                        }


                    </Box>
                </>
            )}
        </Box>
    );
};

export default Cart;

