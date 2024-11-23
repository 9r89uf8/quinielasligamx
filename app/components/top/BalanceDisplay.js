import React, { useState, useEffect } from 'react';
import { useStore } from '@/app/store/store';
import {editUser} from "@/app/services/authService";
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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
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
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
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

const BalanceDisplay = () => {
    const user = useStore((state) => state.user);
    const [openDialog, setOpenDialog] = useState(false);
    const [withdrawalMethod, setWithdrawalMethod] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        bankAccountNumber: '',
        country: 'México',
    });
    const [showForm, setShowForm] = useState(false);

    // Determine if the user is authorized
    const isAuthorized = !!(user && user.uid);

    // Update formData when user data is loaded
    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                fullName: user.fullName || '',
                phoneNumber: user.phone || '',
                bankAccountNumber: user.bank || '',
                country: user.country || 'MX',
                // Do not pre-fill bankAccountNumber for security reasons
            }));
        }
    }, [user]);

    const handleWithdrawalClick = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setWithdrawalMethod('');
        setShowForm(false);
        setFormData({
            fullName: user?.fullName || '',
            phoneNumber: user?.phone || '',
            bankAccountNumber: user?.bank || '',
            country: user?.country || 'MX',
        });
    };

    const handleMethodSelect = (method) => {
        setWithdrawalMethod(method);
        setShowForm(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await editUser({fullName: formData.fullName, email: user.email, uid: user.uid, phone: formData.phoneNumber, bank: formData.bankAccountNumber, country: formData.country});
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
                {withdrawalMethod === 'bank' && (
                    <TextField
                        label="Número de Cuenta Bancaria"
                        value={formData.bankAccountNumber}
                        onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                        required
                        fullWidth
                    />
                )}
                {withdrawalMethod === 'cash' && (
                    <FormControl fullWidth required>
                        <InputLabel>País</InputLabel>
                        <Select
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            label="País"
                        >
                            <MenuItem value="MX">México</MenuItem>
                            <MenuItem value="US">Estados Unidos</MenuItem>
                        </Select>
                    </FormControl>
                )}
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
                            3. Visite cualquier sucursal de Western Union en {formData.country} con su identificación y el MTCN para recoger su dinero.
                        </Typography>
                    </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!isAuthorized}
                    >
                        {isAuthorized ? 'Guardar' : 'Guardar'}
                    </Button>
                </Box>
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
                            ${user && user.amountWon ? user.amountWon.toLocaleString() : '0'}{' '}
                            {user ? (user.country === 'US' ? 'Dólares' : 'Pesos') : 'Dólares'}
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
                                        <Typography variant="body2" color="text.secondary">
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
                                        <Typography variant="body2" color="text.secondary">
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


