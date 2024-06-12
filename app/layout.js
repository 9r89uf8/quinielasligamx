// app/layout.jsx
import React from 'react';
import Navbar from "@/app/components/Navbar";
import FloatingNavbar from "@/app/components/FloatingNavbar";
import Notifications from "@/app/components/Notifications";
import Head from 'next/head';
import './styles/globals.css';

const Layout = ({ children }) => {
  return (
      <html lang="es">
          <Head>
              <title>Quinielas de la Liga MX 2024-2025 - 10,000 Dólares en Efectivo a los Ganadores.</title>
              <meta name="description" content="10,000 dólares en premios: Participa en las quinielas de la Liga MX 2024-2025 con equipos como América, Chivas, y Cruz Azul. ¡Únete a nuestra comunidad de aficionados al fútbol mexicano y gana premios en efectivo!" />
              <meta name="keywords" content="quinielas, Liga MX, fútbol mexicano, ganar dinero, premios en efectivo, quinielas en línea, apuestas deportivas" />
              <link rel="manifest" href="/manifest.json" />
              <link rel="icon" href="/favicon.ico" />
              <meta name="robots" content="index, follow" />
              <meta name="theme-color" content="#000000" />
          </Head>
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

