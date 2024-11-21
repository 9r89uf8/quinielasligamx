'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@/app/components/nab/MessageIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { alpha, styled } from '@mui/material/styles';

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

export default function FloatingNavbar() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        document.documentElement.style.setProperty('--floating-navbar-height', NAVBAR_HEIGHT);
        return () => {
            document.documentElement.style.removeProperty('--floating-navbar-height');
        };
    }, []);

    const routes = [
        { name: 'HOME', path: '/quiniela-liga-mx-2025', icon: <VideoLibraryIcon fontSize='large' /> },
        { name: 'TOP', path: '/buy', icon: <MessageIcon /> },
        { name: 'USER', path: '/quinielas/dashboard', icon: <AccountCircleIcon fontSize='large' /> },
    ];

    return (
        <FloatingBottomNavigation
            value={pathname}
            onChange={(event, newValue) => {
                router.push(newValue);
            }}
        >
            {routes.map((route, index) => (
                <StyledBottomNavigationAction
                    key={index}
                    label={route.name}
                    value={route.path}
                    icon={route.icon}
                />
            ))}
        </FloatingBottomNavigation>
    );
}


