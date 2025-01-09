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
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';

const NAVBAR_HEIGHT = '57px'; // Increased height to accommodate larger icons

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
    color: 'rgba(0, 0, 0, 0.7)',
    '&.Mui-selected': {
        color: 'rgba(0, 0, 0, 0.9)',
    },
    '& .MuiSvgIcon-root': { // Add custom styling for icons
        fontSize: '3.1rem', // Make icons bigger
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
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    height: ${NAVBAR_HEIGHT};
    max-width: 1200px;
    margin: 0 auto;
`;

const StyledPopover = styled(Popover)(({ theme }) => ({
    '& .MuiPaper-root': {
        background: 'linear-gradient(to right, #333333, #555555)',
        borderRadius: '12px',
        padding: theme.spacing(1),
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        maxWidth: 'none',
    },
}));

const StyledButton = styled(Button)(({ theme, gradient }) => ({
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: 'none',
    color: '#fff',
    backgroundImage: gradient,
    borderRadius: '8px',
    minWidth: '30px',
    '& .MuiSvgIcon-root': { // Add custom styling for icons in popover buttons
        fontSize: '2.5rem',
    },
    '&:hover': {
        backgroundImage: gradient,
        filter: 'brightness(1.1)',
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
            icon: <HomeIcon />, // Removed fontSize prop as it's handled by styled component
        },
        {
            name: 'OPTIONS',
            path: null,
            icon: <MessageIcon />,
            onClick: handleMenuOpen,
        },
        {
            name: 'USER',
            path: '/quinielas/dashboard',
            icon: <AccountCircleIcon />,
        },
    ];

    const menuOptions = [
        {
            label: 'Mensaje',
            icon: <ChatIcon />,
            path: '/chat',
            gradient: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        },
        {
            label: 'Comprar',
            icon: <ShoppingCartIcon />,
            path: '/buy',
            gradient: 'linear-gradient(to right, #6a11cb, #2575fc)',
        },
        {
            label: 'Ganadores',
            icon: <EmojiEventsIcon />,
            path: '/ganadores',
            gradient: 'linear-gradient(to right, #43cea2, #185a9d)',
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
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Grid container spacing={1} justifyContent="center">
                    {menuOptions.map((option, index) => (
                        <Grid item key={index}>
                            <StyledButton
                                gradient={option.gradient}
                                onClick={() => {
                                    handleMenuClose();
                                    router.push(option.path);
                                }}
                            >
                                <Box sx={{ fontSize: '1.2rem', marginBottom: '8px' }}>{option.label}</Box>
                                {React.cloneElement(option.icon)}
                            </StyledButton>
                        </Grid>
                    ))}
                </Grid>
            </StyledPopover>
        </>
    );
}





