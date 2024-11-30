// components/Cart.js
'use client';

import React from 'react';
import {
    Paper,
    Typography,
    Button,
    Box,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
} from '@mui/material';
import { useStore } from '@/app/store/store';
import { deleteQuiniela } from '@/app/services/quinielasService';
import Link from "next/link";
import CheckoutButton from "@/app/components/CheckoutButton";
import FreeQuinielasButton from "@/app/components/FreeQuinielasButton";
import SimpleQuinielaDisplay from "@/app/components/quinielas/SimpleQuinielaDisplay";

const PrizeCard = ({ country, children }) => {
    return (
        <Paper
            sx={{
                background: 'linear-gradient(135deg, #343a40, #212529)',
                padding: -10,
                border: '8px solid #343a40',
                borderRadius: 2,
                marginBottom: 2.5,
                textAlign: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <Box sx={{ mt: 2 }}>
                {children}
            </Box>
        </Paper>
    );
};

const QuinielaCard = ({ item, index, onDelete, onView, loadingCart, currency }) => {
    return (
        <Paper sx={{
            padding: 2,
            marginBottom: 2,
            background: 'white',
            borderRadius: 2,
        }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h6">
                    Quiniela #{index + 1}
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="subtitle1">
                    ${item.price} {currency}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2
            }}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(item.id)}
                    disabled={loadingCart}
                >
                    {loadingCart ? 'Cargando...' : 'Eliminar'}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => onView(item, index)}
                    sx={{
                        color: '#0466c8',
                        borderColor: '#0466c8',
                        '&:hover': {
                            borderColor: '#0466c8',
                            backgroundColor: 'rgba(4, 102, 200, 0.1)'
                        }
                    }}
                >
                    Ver Quiniela
                </Button>
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

    const totalQuinielasInCart = cart.length;
    const freeQuinielasAvailable = freeQuinielasAmount || 0;
    const freeQuinielasUsed = Math.min(freeQuinielasAvailable, totalQuinielasInCart);
    const paidQuinielas = totalQuinielasInCart - freeQuinielasUsed;

    const [openItemIndex, setOpenItemIndex] = React.useState(null);
    const [selectedItem, setSelectedItem] = React.useState(null);

    const isUserRegistered = user && user.uid;
    const isCartEmpty = !cart || cart.length === 0;
    const country = user && user.country ? user.country : 'MX';
    const pricePerQuiniela = country === 'US' ? 3 : 45;
    const currency = country === 'US' ? 'USD' : 'MXN';

    const calculateTotal = () => {
        return paidQuinielas * pricePerQuiniela;
    };

    const handleRemoveFromCart = async (id) => {
        try {
            await deleteQuiniela(id);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleViewQuiniela = (item, index) => {
        setSelectedItem(item);
        setOpenItemIndex(index);
    };

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
                    {!isUserRegistered && (
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Regístrate para comprar quinielas
                            </Typography>
                            <Button
                                variant="contained"
                                component={Link}
                                href="/register"
                                sx={{
                                    color: 'black',
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
                        </Box>
                    )}
                </>
            ) : (
                <>
                    <Box sx={{ mb: 3 }}>
                        {cart.map((item, index) => (
                            <QuinielaCard
                                key={index}
                                item={item}
                                index={index}
                                onDelete={handleRemoveFromCart}
                                onView={handleViewQuiniela}
                                loadingCart={loadingCart}
                                currency={country === 'US' ? 'dólares' : 'pesos'}
                            />
                        ))}
                    </Box>

                    {openItemIndex !== null && (
                        <Dialog
                            open={openItemIndex !== null}
                            onClose={() => setOpenItemIndex(null)}
                            fullWidth
                            maxWidth="md"
                        >
                            <DialogTitle>Quiniela #{openItemIndex + 1}</DialogTitle>
                            <DialogContent>
                                <SimpleQuinielaDisplay quiniela={selectedItem} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenItemIndex(null)} color="primary">
                                    Cerrar
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}

                    <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
                        {user && freeQuinielasAmount > 0 && (
                            <Typography variant="h5" sx={{ color: 'white' }}>
                                Quinielas Gratis: {freeQuinielasAmount}
                            </Typography>
                        )}
                        <Typography variant="h5" sx={{ color: 'white' }}>
                            Total: ${calculateTotal().toFixed(2)} {currency}
                        </Typography>
                        {calculateTotal() === 0 ? (
                            <FreeQuinielasButton
                                price={buyJornada ? buyJornada.price : jornada.price}
                                country={user.country}
                                user={user.uid}
                                jornadaId={buyJornada ? buyJornada.id : jornada.id}
                            />
                        ) : (
                            <CheckoutButton
                                price={buyJornada ? buyJornada.price : jornada.price}
                                country={user.country}
                                user={user.uid}
                                jornadaId={buyJornada ? buyJornada.id : jornada.id}
                            />
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Cart;

