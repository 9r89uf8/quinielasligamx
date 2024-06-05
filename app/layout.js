// app/layout.jsx
import React from 'react';
import Navbar from "@/app/components/Navbar";
import FloatingNavbar from "@/app/components/FloatingNavbar";
import Notifications from "@/app/components/Notifications";
import './styles/globals.css';

const Layout = ({ children }) => {
  return (
      <html lang="en">
      <body>

        <Navbar/>
        <Notifications />
        <main style={{ paddingBottom: '90px' }}>{children}</main>
        <FloatingNavbar/>
      </body>
      </html>
  );
};

export default Layout;

