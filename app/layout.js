import React from 'react';
import Navbar from "@/app/components/Navbar";
import FloatingNavbar from "@/app/components/FloatingNavbar";
import Notifications from "@/app/components/Notifications";
import './styles/globals.css';

function generateSchemaMarkup() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Quiniela Liga MX",
        "url": "https://www.quinielaligamx.com",
        "description": "Quiniel liga mx 2025 del fútbol mexicano. 10,000 dólares en premios",
        "inLanguage": "es",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.quinielaligamx.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };


    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "¿Cómo funciona la Quiniela Liga MX?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La Quiniela Liga MX es un juego donde predices los resultados de los partidos de la Liga MX. Los participantes con más aciertos ganan premios en efectivo de hasta $10,000 USD o $150,000 MXN dependiendo de su país de residencia."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cuánto puedo ganar en la Quiniela Liga MX?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Los premios varían según tu país: $10,000 USD para residentes de Estados Unidos y $150,000 MXN para residentes de México."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cómo participar en la Quiniela Liga MX?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Para participar: 1) Regístrate en la plataforma, 2) Selecciona tus predicciones para los partidos de la jornada, 3) Espera los resultados y 4) Si aciertas, ¡gana premios en efectivo!"
                }
            }
        ]
    };

    return {
        __html: JSON.stringify([schemaData, faqSchema])
    };
}

const Layout = ({ children }) => {
    const currentYear = new Date().getFullYear();
    const nextYear = '2025';
    const titleText = `Quiniela Liga MX 2025 - Gana Hasta $10,000 USD | Predicciones Fútbol Mexicano`;

    return (
        <html lang="es">
        <head>
            <title>{titleText}</title>
            <meta name="description"
                  content={`$10,000 dólares en premios. Participa en la mejor quiniela Liga MX ${currentYear}-${nextYear} con equipos como América, Chivas, y Cruz Azul. ¡Únete a la quiniela Liga MX más emocionante!`}/>
            <meta name="keywords"
                  content={`quinielas liga mx ${currentYear}, quinielas liga mx, quiniela liga mx, quiniela liga mx ${currentYear}, apuestas deportivas, predicciones futbol mexicano`}/>
            <link rel="canonical" href="https://www.quinielaligamx.com/"/>
            <meta property="og:title" content={`Quinielas Liga MX ${currentYear} | Gana $10,000 en Efectivo`}/>
            <meta property="og:description"
                  content={`Participa en las mejores quinielas Liga MX ${currentYear}-${nextYear}. Gana hasta $10,000 en efectivo prediciendo resultados. ¡Únete ahora!`}/>
            <meta property="og:url" content="https://www.quinielaligamx.com/"/>
            <meta property="og:type" content="website"/>
            <meta property="og:image" content="https://www.quinielaligamx.com/og-image.jpg"/>
            <meta property="og:image:alt" content="Quiniela Liga MX Preview"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={`Quinielas Liga MX ${currentYear} | Gana $10,000 en Efectivo`}/>
            <meta name="twitter:description"
                  content={`Participa en las mejores quinielas Liga MX ${currentYear}-${nextYear}. Gana hasta $10,000 en efectivo prediciendo resultados. ¡Únete ahora!`}/>
            <meta name="twitter:image" content="https://www.quinielaligamx.com/twitter-card.jpg"/>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="robots" content="index, follow"/>
            <meta name="theme-color" content="#000000"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={generateSchemaMarkup()}
            />
        </head>
        <body>
        <Navbar/>
        <Notifications/>
        <main style={{paddingBottom: '90px'}}>{children}</main>
        <FloatingNavbar/>
        </body>
        </html>
    );
};

export default Layout;

