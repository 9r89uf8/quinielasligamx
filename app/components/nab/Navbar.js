// Navbar.js
import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import NavbarClient from './NavbarClient';

const Navbar = async () => {

    return (
        <AppBar position="relative"
               sx={{
                   background: 'linear-gradient(135deg, #000814, #212529)',
                   border: '1px solid rgba(255, 255, 255, 0.3)',
                   margin: '16px auto',
                   borderRadius: '8px',
                   boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.16)',
                   width: 'calc(100% - 32px)',
                   maxWidth: '1200px',
                   overflow: 'visible',
               }}>
            <Toolbar  sx={{ minHeight: '64px', position: 'relative' }}>
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

