'use client';

import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { logoutUser } from '../services/authService'; // Ensure this path is correct
import { useStore } from '../store/store'; // Ensure this path is correct according to your structure

const NavbarClient = () => {
    const user = useStore((state) => state.user);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        handleMenuClose();
        router.push('/login');
    };

    const handleRegister = () => {
        handleMenuClose();
        router.push('/register');
    };

    const handleSignOut = async () => {
        await logoutUser();
        handleMenuClose();
        router.push('/login');
    };

    return (
        <div>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
            >
                <DehazeIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {user ? (
                    <MenuItem onClick={handleSignOut}>Salir</MenuItem>
                ) : [
                    <MenuItem key="login" onClick={handleLogin}>Entrar a mi cuenta</MenuItem>,
                    <MenuItem key="register" onClick={handleRegister}>Crear Cuenta</MenuItem>
                ]}
            </Menu>
        </div>
    );
};

export default NavbarClient;