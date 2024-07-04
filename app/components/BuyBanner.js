import React from 'react';
import { Box, Button, Typography, styled, Paper, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/PeopleAltOutlined';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useRouter} from "next/navigation"; // Import the icon for the accordion

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: "linear-gradient(45deg, #06d6a0 30%, #118ab2 90%)",
    color: 'white',
    boxShadow: theme.shadows[3],
    '&:before': {
        backgroundColor: 'transparent',
    },
    borderRadius: 12,
    marginTop: 2,
    marginBottom: 40
}));

const StyledButton = styled(Button)(({ theme }) => ({
    color: 'white',
    background: "linear-gradient(45deg, #343a40 30%, #212529 90%)",
    fontSize: 18,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    padding: theme.spacing(1, 4),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));



const BuyBanner = ({cart, jornada}) => {
    const router = useRouter();

    const handleChatRedirect = () => {
        if(cart&&cart.length>0){
            router.push('/cart');
        }else {
            router.push('/buy');
        }

    };

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom align="center" color="inherit">
                Comprar Quinielas
            </Typography>

            <Accordion style={{margin: '10px auto 20px auto'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{fontSize:43}}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h6" component="div">Precios de Quinielas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                            <Box display="flex" flexDirection="column" alignItems="center" style={{ marginLeft: 8 }}>
                                {/*<Typography variant="h5" component="div" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>*/}
                                {/*    Precio*/}
                                {/*</Typography>*/}
                                <Typography variant="h5" component="div" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 5 }}>
                                    ${jornada.price} Dólares por Quiniela
                                </Typography>
                                <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                                    si vives en USA
                                </Typography>
                                <MoreHorizIcon fontSize="large" style={{margin: 8, color: '#adb5bd'}}/>
                                <Typography variant="h5" component="div" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 5 }}>
                                    ${jornada.price*15} Pesos por Quiniela
                                </Typography>
                                <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
                                    si vives en México
                                </Typography>
                            </Box>
                        </Box>
                </AccordionDetails>
            </Accordion>

            <StyledButton onClick={handleChatRedirect}>
                Comprar
            </StyledButton>
        </StyledPaper>
    );
};

export default BuyBanner;
