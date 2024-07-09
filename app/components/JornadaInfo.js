// WinningsReceptionMethods.js
import React from 'react';
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Divider, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: '#ffffff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundImage: 'linear-gradient(45deg, #403d39, #252422)',
    color: 'white',
    padding: '10px 20px',
    fontSize: '22px',
    marginBottom: 12,
    borderRadius: '20px',
    fontWeight: 'bold',
}));

const CustomAccordion = styled(Accordion)(({ theme }) => ({
    background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
    color: theme.palette.common.white,
    margin: theme.spacing(1, 0),
    '&:before': {
        backgroundColor: 'transparent',
    },
}));

const PrizeHighlight = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: "linear-gradient(45deg, #f8f9fa 30%, #e9ecef 90%)",
    color: 'black',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    marginTop: theme.spacing(1)
}));

const JornadaInfo = ({ jornada }) => {
    return (
        <Item elevation={6}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h2" gutterBottom style={{ color: '#333', fontFamily: '"Roboto", sans-serif' }}>
                        Quiniela Liga Mx
                    </Typography>
                    <Divider style={{ marginBottom: 16 }}><SportsSoccerIcon /></Divider>
                </Grid>
                {jornada && (
                    <>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Jornada {jornada.jornadaNum}
                            </Typography>
                            <Typography variant="h5" gutterBottom style={{ color: '#555' }}>
                                Termina el {jornada.endDate}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <PrizeHighlight>
                                <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                                    <Box display="flex" flexDirection="column" alignItems="center" style={{ marginLeft: 8 }}>
                                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>
                                            Premio
                                        </Typography>
                                        <StyledButton>
                                            ${jornada.prize} Dólares
                                        </StyledButton>
                                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                             si vives en USA
                                        </Typography>
                                        <MoreHorizIcon fontSize="large" style={{margin: 8, color: '#adb5bd'}}/>
                                        <StyledButton>
                                            ${jornada.prize*15} Pesos
                                        </StyledButton>
                                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                             si vives en México
                                        </Typography>
                                    </Box>
                                </Box>
                            </PrizeHighlight>
                        </Grid>

                        <Grid item xs={12}>
                            <CustomAccordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "white", fontSize:43 }} />} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography variant="h6">Necitas 9 puntos para ganar</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="h6" gutterBottom>
                                        Necesitas hacer 9 puntos en una quiniela para ganar los ${jornada.prize} dolares o ${jornada.prize*15} Pesos automaticamente.
                                    </Typography>
                                    <Typography variant="h6">
                                        Cada persona con 9 puntos gana ${jornada.prize} dolares o ${jornada.prize*15} pesos sin importar la cantidad de ganadores.
                                    </Typography>
                                </AccordionDetails>
                            </CustomAccordion>
                            {/*<CustomAccordion>*/}
                            {/*    <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />} aria-controls="panel1a-content" id="panel1a-header">*/}
                            {/*        <Typography variant="subtitle1">$2.00 Dolares por Quiniela</Typography>*/}
                            {/*    </AccordionSummary>*/}
                            {/*    <AccordionDetails>*/}
                            {/*        <Typography variant="body1" gutterBottom>*/}
                            {/*            Cada quiniela cuesta $2.00 Dolares*/}
                            {/*        </Typography>*/}
                            {/*        <Typography variant="body1">*/}
                            {/*            Puedes pagar con tarjeta de credito o Paypal.*/}
                            {/*        </Typography>*/}
                            {/*    </AccordionDetails>*/}
                            {/*</CustomAccordion>*/}
                        </Grid>

                        {/*<Grid item xs={12}>*/}
                        {/*    <PrizeHighlight>*/}
                        {/*        <Box display="flex" alignItems="center" justifyContent="center" width="100%">*/}
                        {/*            <Box display="flex" flexDirection="column" alignItems="center" style={{ marginLeft: 8 }}>*/}
                        {/*                <Typography variant="h5" component="div" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>*/}
                        {/*                    Precio*/}
                        {/*                </Typography>*/}
                        {/*                <StyledButton>*/}
                        {/*                    $3 Dólares por Quiniela*/}
                        {/*                </StyledButton>*/}
                        {/*                <Typography variant="h5" component="div" style={{ fontWeight: 'bold', textAlign: 'center' }}>*/}
                        {/*                    si vives en USA*/}
                        {/*                </Typography>*/}
                        {/*                <MoreHorizIcon fontSize="large" style={{margin: 8, color: '#adb5bd'}}/>*/}
                        {/*                <StyledButton>*/}
                        {/*                    $50 Pesos por Quiniela*/}
                        {/*                </StyledButton>*/}
                        {/*                <Typography variant="h5" component="div" style={{ fontWeight: 'bold', textAlign: 'center' }}>*/}
                        {/*                    si vives en México*/}
                        {/*                </Typography>*/}
                        {/*            </Box>*/}
                        {/*        </Box>*/}
                        {/*    </PrizeHighlight>*/}
                        {/*</Grid>*/}

                    </>
                )}
            </Grid>
        </Item>
    );
};

export default JornadaInfo;
