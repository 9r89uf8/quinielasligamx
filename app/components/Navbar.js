// Navbar.js
import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import NavbarClient from './NavbarClient';

const Navbar = async () => {

    return (
        <AppBar position="static" sx={{ backgroundColor: '#161a1d' }}>
            <Toolbar>
                <Box display="flex" alignItems="center" flexGrow={1}>
                    <img
                        src="https://chicagocarhelp.s3.us-east-2.amazonaws.com/Quinielas+(2).png"
                        alt="logo"
                        style={{ width: 45, height: 'auto', marginRight: 4 }}
                    />
                    <Link href="/" passHref legacyBehavior>
                        <Button color="inherit" component="a">Quiniela Liga MX</Button>
                    </Link>
                </Box>

                <NavbarClient/>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

// ... rest of the code remains the same

