'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MessageIcon from "@/app/components/nab/MessageIcon";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ChatIcon from '@mui/icons-material/Chat';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const NAVBAR_HEIGHT = '64px'; // Adjusted to match the top bar height

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
    '.MuiBottomNavigationAction-root': {
        maxWidth: 'none',
    },
    '.MuiBottomNavigationAction-label': {
        display: 'none',
    },
    '& .Mui-selected': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.7)', // Dark icons for better contrast
    '&.Mui-selected': {
        color: 'rgba(0, 0, 0, 0.9)', // Darker color for selected icons
    },
}));

const FloatingBottomNavigation = styled(BottomNavigation)`
    position: fixed;
    bottom: 16px;
    left: 16px;
    right: 16px;
    z-index: 999;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* For Safari support */
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    height: ${NAVBAR_HEIGHT};
    max-width: 1200px;
    margin: 0 auto;
`;

const StyledPopover = styled(Popover)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        padding: theme.spacing(2),
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        minWidth: '200px',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: 'none',
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: theme.spacing(2),
    minWidth: '80px',
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
}));

export default function FloatingNavbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        document.documentElement.style.setProperty('--floating-navbar-height', NAVBAR_HEIGHT);
        return () => {
            document.documentElement.style.removeProperty('--floating-navbar-height');
        };
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const routes = [
        {
            name: 'HOME',
            path: '/quiniela-liga-mx-2025',
            icon: <VideoLibraryIcon fontSize="large" />,
        },
        {
            name: 'OPTIONS',
            path: null,
            icon: <MessageIcon fontSize="large" />,
            onClick: handleMenuOpen,
        },
        {
            name: 'USER',
            path: '/quinielas/dashboard',
            icon: <AccountCircleIcon fontSize="large" />,
        },
    ];

    const menuOptions = [
        {
            label: 'Mensaje',
            icon: <ChatIcon fontSize="large" />,
            path: '/chat',
        },
        {
            label: 'Comprar',
            icon: <ShoppingCartIcon fontSize="large" />,
            path: '/buy',
        },
        {
            label: 'Ganadores',
            icon: <EmojiEventsIcon fontSize="large" />,
            path: '/winners',
        },
    ];

    return (
        <>
            <FloatingBottomNavigation
                value={pathname}
                onChange={(event, newValue) => {
                    if (newValue) {
                        router.push(newValue);
                    }
                }}
            >
                {routes.map((route, index) => (
                    <StyledBottomNavigationAction
                        key={index}
                        label={route.name}
                        value={route.path}
                        icon={route.icon}
                        onClick={(event) => {
                            if (route.onClick) {
                                event.preventDefault();
                                route.onClick(event);
                            }
                        }}
                    />
                ))}
            </FloatingBottomNavigation>

            <StyledPopover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    {menuOptions.map((option, index) => (
                        <Grid item key={index}>
                            <StyledButton
                                onClick={() => {
                                    handleMenuClose();
                                    router.push(option.path);
                                }}
                            >
                                <Box sx={{ fontSize: '1rem', marginBottom: '8px' }}>{option.label}</Box>
                                {React.cloneElement(option.icon, { fontSize: 'large' })}
                            </StyledButton>
                        </Grid>
                    ))}
                </Grid>
            </StyledPopover>
        </>
    );
}




