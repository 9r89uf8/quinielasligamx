// JornadaInfo.js (Server Component)
import {
    Grid,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Button,
    Paper, Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from "next/link";
import React from "react";

const PrizeCard = ({ country, children }) => {
    let background;
    let flagColors;

    if (country === 'USA') {
        background = 'linear-gradient(135deg, #495057, #343a40)';
        flagColors = ['#00509d', '#FFFFFF', '#d90429']; // Blue, White, Red stripes
    } else if (country === 'México') {
        background = 'linear-gradient(135deg, #495057, #343a40)';
        flagColors = ['#006847', '#FFFFFF', '#CE1126']; // Green, White, Red stripes
    } else {
        background = '#f1f1f1';
        flagColors = [];
    }

    return (
        <Paper
            sx={{
                background: 'linear-gradient(135deg, #343a40, #212529)', // Dark background
                padding: 2,
                border: '8px solid #343a40', // Gold border
                borderRadius: 2,
                marginBottom: 2.5,
                textAlign: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Content with some padding to avoid overlapping the flag bar */}
            <Box sx={{ mt: 2 }}>
                {children}
            </Box>
        </Paper>
    );
};

const Item = ({ children, ...props }) => (
    <Paper
        {...props}
        sx={{
            background: 'linear-gradient(135deg, #f8f9fa, #dee2e6)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: 2,
            borderRadius: 2,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            marginBottom: 4,
            position: 'relative',
            width: '100%',
        }}
    >
        {children}
    </Paper>
);

const StyledButton = ({ children, ...props }) => (
    <Button
        {...props}
        sx={{
            backgroundImage: 'linear-gradient(45deg, #403d39, #252422)',
            color: 'white',
            padding: '10px 20px',
            fontSize: '22px',
            marginBottom: '12px',
            borderRadius: '20px',
            fontWeight: 'bold',
        }}
    >
        {children}
    </Button>
);

const CustomAccordion = ({ children, ...props }) => (
    <Accordion
        {...props}
        sx={{
            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
            color: 'common.white',
            my: 1,
            '&:before': {
                backgroundColor: 'transparent',
            },
        }}
    >
        {children}
    </Accordion>
);

const PrizeHighlight = ({ children, ...props }) => (
    <Box
        {...props}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(45deg, #f8f9fa 30%, #e9ecef 90%)',
            color: 'black',
            p: 1,
            borderRadius: 1,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            mt: 1,
        }}
    >
        {children}
    </Box>
);

export default async function JornadaInfo({jornada}) {


    let prizeM = jornada.prize*15
    return (
        <Item elevation={3}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Typography
                        variant="h1"
                        sx={{
                            color: '#222222',
                            fontSize: {xs: '2.0rem', md: '4rem'},
                            fontWeight: 900,
                            mb: 2,
                        }}
                    >
                        Quiniela Liga MX
                    </Typography>
                    <Typography variant="h4" gutterBottom sx={{ color: '#343a40' }}>
                        Jornada {jornada.jornadaNum}
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ color: '#343a40' }}>
                        Termina el {jornada.endDate}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <PrizeCard country="México">
                        <Typography variant="h5" gutterBottom style={{color: 'white'}}>
                            Si vives en México ganas
                        </Typography>
                        <Divider sx={{ my: 1, borderColor: '#595959' }}/>
                        <Typography
                            variant="h3"
                            component="h3"
                            sx={{
                                fontWeight: 700,
                                color: '#06d6a0',
                                mb: 1,
                            }}
                        >
                            ${prizeM.toLocaleString()}
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{fontWeight: 500, color: '#ffffff', mb: 2}}
                        >
                            pesos
                        </Typography>
                        <Divider sx={{ my: 1, borderColor: '#595959' }}/>
                        <Typography variant="h5" sx={{mb: 2}} style={{color: 'white'}}>
                            1 quiniela cuesta $45 pesos
                        </Typography>
                    </PrizeCard>
                </Grid>
                <Grid item xs={12}>
                    <PrizeCard country="USA">
                        <Typography variant="h5" gutterBottom style={{color: 'white'}}>
                            Si vives en Estados Unidos ganas
                        </Typography>
                        <Divider sx={{ my: 1, borderColor: '#595959' }}/>
                        <Typography
                            variant="h3"
                            component="h3"
                            sx={{
                                fontWeight: 700,
                                color: '#06d6a0',
                                mb: 1,
                            }}
                        >
                            ${jornada.prize.toLocaleString()}
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{fontWeight: 500, color: '#ffffff', mb: 2}}
                        >
                            dólares
                        </Typography>
                        <Divider sx={{ my: 1, borderColor: '#595959' }}/>
                        <Typography variant="h5" sx={{mb: 2}} style={{color: 'white'}}>
                            1 quiniela cuesta $3 dólares
                        </Typography>
                    </PrizeCard>
                </Grid>

                <Grid item xs={12}>
                    <CustomAccordion>
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon sx={{ color: 'white', fontSize: 43 }} />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h6">
                                Necesitas 9 puntos para ganar
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6" gutterBottom>
                                Necesitas hacer 9 puntos en una quiniela para ganar los $
                                {jornada.prize} dólares o ${jornada.prize * 15} pesos
                                automáticamente.
                            </Typography>
                            <Typography variant="h6">
                                Cada persona con 9 puntos gana ${jornada.prize} dólares o $
                                {jornada.prize * 15} pesos sin importar la cantidad de
                                ganadores.
                            </Typography>
                        </AccordionDetails>
                    </CustomAccordion>
                </Grid>
            </Grid>
        </Item>
    );
};


