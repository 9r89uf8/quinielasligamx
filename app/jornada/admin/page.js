
'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DummyQuinielas from "@/app/components/jornada/DummyQuinielas";
import DummyQuinielaWinners from "@/app/components/jornada/DummyQuinielaWinners";
import DeleteAllQuinielas from "@/app/components/jornada/DeleteAllQuinielas";
import {refundJornada, fetchAllJornadas} from "@/app/services/jornadaService";
import {alpha, styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {Paper, Typography, CircularProgress, Box} from "@mui/material";
import { useStore } from '@/app/store/store';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #023e8a, #03045e)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    padding: '6px 16px',
    margin: '4px',
    fontSize: '0.985rem',
    lineHeight: '1.5',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
    '&.selected': {
        background: 'rgba(255, 255, 255, 0.5)',
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: 15,
    color: '#ffffff',
    background: 'linear-gradient(45deg, #343a40, #001219)', // semi-transparent white
    backdropFilter: 'blur(10px)', // apply blur
    borderRadius: 10, // rounded corners
    border: `1px solid ${alpha('#ffffff', 0.2)}`,
}));

const JornadasAdmin = () => {
    const jornadas = useStore((state) => state.jornadas);
    const dummy = useStore((state) => state.dummy);
    const jornada = useStore((state) => state.jornada);
    const router = useRouter();

    useEffect(() => {
        fetchAllJornadas();
    }, []);

    const handleToggleRefund = () => {
        // Confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to refund this jornada?");
        if (isConfirmed) {
            // If confirmed, dispatch the refund action
            refundJornada({ jornada: jornada })
        }
    };

    if (!jornadas) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const handleNavigate = (id) => {
        router.push(`/jornada/update/${jornada.id}`); // Replace '/register' with the path you want to navigate to
    };

    return (
        <div>
            {jornadas.map((jornada) => (
                <Grid container spacing={2} key={jornada.id}>
                    <Grid item xs={12}>
                        <Item elevation={4} style={{marginBottom: 3}}>
                            <Typography variant="h5" gutterBottom style={{marginBottom: 3, marginTop: 7}}>
                                {jornada.jornadaNum}
                            </Typography>

                            <DeleteAllQuinielas jornada={jornada} loading={dummy}/>
                            <DummyQuinielaWinners jornada={jornada} loading={dummy}/>
                            <DummyQuinielas jornada={jornada} loading={dummy}/>


                            <GradientButton onClick={() => handleNavigate(jornada.id)}>Update jornada</GradientButton>

                            <div>
                                <Button
                                    disabled={jornada.refunded}
                                    onClick={handleToggleRefund} // Adjust this if you have a separate handler for private posts
                                    style={{
                                        backgroundImage: 'linear-gradient(45deg, #ffffff 30%, #f8f9fa 90%)',
                                        color: 'black',
                                        padding: '10px 20px',
                                        borderRadius: '20px',
                                        fontWeight: 'bold',
                                        marginTop: '10px',
                                        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, 0.3)'
                                    }}
                                >
                                    {jornada.refunded?<span>Refunded</span>: <span>Refund</span>}
                                </Button>
                            </div>


                        </Item>

                    </Grid>
                    {/* Here you can add more info about the jornada or related actions */}
                </Grid>
            ))}
        </div>
    );
};

export default JornadasAdmin;