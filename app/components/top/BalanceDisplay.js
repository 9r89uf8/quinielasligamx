import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 450,
    margin: '0 auto',
    background: 'linear-gradient(135deg, #f8f9fa, #dee2e6)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
}));

const BalanceContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

const LabelContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const AmountContainer = styled(Box)(({ theme }) => ({
    paddingLeft: theme.spacing(1),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
}));

const WithdrawalOption = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const BalanceDisplay = ({ amount, currency = 'US', phoneNumber }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [withdrawalMethod, setWithdrawalMethod] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: phoneNumber || '',
    });
    const [showForm, setShowForm] = useState(false);

    const handleWithdrawalClick = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setWithdrawalMethod('');
        setShowForm(false);
    };

    const handleMethodSelect = (method) => {
        setWithdrawalMethod(method);
        setShowForm(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Withdrawal details:', {
            method: withdrawalMethod,
            ...formData,
        });
        // Add your API call here
        handleClose();
    };

    const renderForm = () => (
        <form onSubmit={handleFormSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField
                    label="Nombre Completo"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    fullWidth
                />
                <TextField
                    label="Número de Teléfono"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                    fullWidth
                />
                <Alert severity="info">
                    Nos pondremos en contacto con usted una vez que gane para verificar la información o responder cualquier pregunta que tenga.
                </Alert>
                {withdrawalMethod === 'cash' && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">¿Cómo funciona el retiro en efectivo?</Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            1. Una vez que gane, le llamaremos para confirmar sus datos.
                            <br />
                            2. Le proporcionaremos un número de control de transferencia de dinero (MTCN).
                            <br />
                            3. Visite cualquier sucursal de Western Union con su identificación y el MTCN para recoger su dinero.
                        </Typography>
                    </Box>
                )}
                <Button type="submit" variant="contained" color="primary">
                    Enviar Solicitud
                </Button>
            </Box>
        </form>
    );

    return (
        <>
            <StyledPaper elevation={3}>
                <BalanceContainer>
                    <LabelContainer>
                        <AccountBalanceWalletIcon color="primary" />
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                        >
                            Cantidad Ganada
                        </Typography>
                    </LabelContainer>

                    <AmountContainer>
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                color: 'text.primary',
                            }}
                        >
                            ${amount?.toLocaleString()} {currency === 'US' ? 'Dólares' : 'Pesos'}
                        </Typography>
                    </AmountContainer>

                    <ButtonContainer>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleWithdrawalClick}
                            sx={{
                                minWidth: 160,
                                textTransform: 'none',
                                fontSize: '1.1rem',
                            }}
                        >
                            Retirar Dinero
                        </Button>
                    </ButtonContainer>
                </BalanceContainer>
            </StyledPaper>

            <Dialog
                open={openDialog}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Seleccione método de retiro</DialogTitle>
                <DialogContent>
                    {!showForm && (
                        <>
                            <WithdrawalOption onClick={() => handleMethodSelect('cash')}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <LocalAtmIcon color="primary" />
                                    <Box>
                                        <Typography variant="h5">Retiro en Efectivo</Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            Sucursales de Western Union en México/Estados Unidos
                                        </Typography>
                                    </Box>
                                </Box>
                            </WithdrawalOption>

                            <WithdrawalOption onClick={() => handleMethodSelect('bank')}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <AccountBalanceIcon color="primary" />
                                    <Box>
                                        <Typography variant="h5">Depósito Bancario</Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            Reciba el dinero directamente en su cuenta bancaria
                                        </Typography>
                                    </Box>
                                </Box>
                            </WithdrawalOption>
                        </>
                    )}

                    {showForm && renderForm()}
                </DialogContent>
                {!showForm && (
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                    </DialogActions>
                )}
            </Dialog>
        </>
    );
};

export default BalanceDisplay;
