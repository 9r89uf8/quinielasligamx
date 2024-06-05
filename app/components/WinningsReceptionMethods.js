// WinningsReceptionMethods.js
import React from 'react';
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Divider, styled, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: '45px auto 45px auto',
    color: theme.palette.text.primary,
    background: '#ffffff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius,
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    background: "linear-gradient(45deg, #6A82FB 30%, #FC5C7D 90%)",
    color: theme.palette.common.white,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    '&:before': {
        backgroundColor: 'transparent',
    },
}));

const WinningsReceptionMethods = () => {
    return (
        <Item elevation={6}>
            <Typography variant="h5" component="div" gutterBottom style={{marginTop: 10}}>
                Cómo Retirar Tu Dinero
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item sm={12} lg={6}>
                    <StyledAccordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{color: "white", fontSize:43}}/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h5">Western Union</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6" gutterBottom style={{textAlign: "start"}}>
                                La forma más fácil y rápida de recibir su dinero.
                            </Typography>
                            <Divider style={{margin: '20px 0'}}/>
                            <Typography variant="h6" gutterBottom style={{textAlign: "start"}}>
                                Uno de nuestros representantes lo llamará cuando gane por teléfono para pedir tu información.
                            </Typography>
                        </AccordionDetails>
                    </StyledAccordion>
                </Grid>
                <Grid item sm={12} lg={6}>
                    <StyledAccordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{color: "white",fontSize:43}}/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant="h5" style={{textAlign: "start"}}>Cuenta de Banco <span style={{color: '#ffc300'}}>recomendado</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6" gutterBottom style={{textAlign: "start"}}>
                                La forma más segura de recibir tu dinero.
                            </Typography>
                            <Divider style={{margin: '20px 0'}}/>
                            <Typography variant="h6" gutterBottom style={{textAlign: "start"}}>
                                Uno de nuestros representantes lo llamará cuando gane por teléfono para pedir tu información.
                            </Typography>
                        </AccordionDetails>
                    </StyledAccordion>
                </Grid>
                {/*<Grid item xs={12} display="flex" justifyContent="center">*/}
                {/*    <MoreHorizIcon fontSize="large" />*/}
                {/*</Grid>*/}
            </Grid>
        </Item>
    );
};

export default WinningsReceptionMethods;

