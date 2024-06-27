// app/layout.jsx
import React from 'react';
import Navbar from "@/app/components/Navbar";
import FloatingNavbar from "@/app/components/FloatingNavbar";
import Notifications from "@/app/components/Notifications";
import './styles/globals.css';

function generateSchemaMarkup() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "quinielasligamx.com",
        "url": "https://www.quinielasligamx.com",
        "description": "Quinielas liga mx 2024-2025 del fútbol mexicano. 10,000 dólares en premios",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.quinielasligamx.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return {
        __html: JSON.stringify(schemaData)
    };
}

const Layout = ({ children }) => {
  return (
      <html lang="es">
        <head>
              <title>Quinielas de la Liga MX 2024-2025 - 10,000 Dólares en Efectivo a los Ganadores.</title>
              <meta name="description" content="10,000 dólares en premios: Participa en las quinielas de la Liga MX 2024-2025 con equipos como América, Chivas, y Cruz Azul. ¡Únete a nuestra comunidad de aficionados al fútbol mexicano y gana premios en efectivo!" />
              <meta name="keywords" content="quinielas, Liga MX, fútbol mexicano, ganar dinero, premios en efectivo, quinielas en línea, apuestas deportivas" />
              <link rel="manifest" href="/manifest.json" />
              <link rel="icon" href="/favicon.ico" />
              <meta name="robots" content="index, follow" />
              <meta name="theme-color" content="#000000" />

            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={generateSchemaMarkup()}
            />
          </head>
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

