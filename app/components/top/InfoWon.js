import React, {Fragment, useEffect, useState} from "react";
import EditUser from "@/app/components/user/EditUser";
import { Grid, Typography, Divider } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import PhoneIcon from '@mui/icons-material/Phone';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper"; // Adjust the import path as necessary
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin:'12px auto 2px auto'
}));
const InfoWon = ({ user }) => {
    const [showForm, setShowForm] = useState(false);
    return (
        <Grid item sm={11} lg={10} xs={11}>
            <Item elevation={6}>
                <Typography variant="h4" component="h2" gutterBottom style={{ color: '#333', fontFamily: '"Roboto", sans-serif' }}>
                    Cantidad Ganada
                </Typography>
                <Divider>
                    <SavingsIcon style={{margin: 9}}/>
                </Divider>
                {user && user.amountWon ?
                    <Typography component="div" variant="h4" color="text.primary">
                        ${user.amountWon} {user.country==='US'?<span>Dólares</span>:<span>Pesos</span>}
                    </Typography>
                    :
                    <Typography component="div" variant="h3" color="text.primary">
                        $0.00
                    </Typography>
                }
                <div style={{border: '2px blue solid', borderRadius: 5, marginTop: 10}}>
                    <Typography component="div" variant="h5" color="text.primary" style={{margin: 12, color: "red"}}>
                        Anuncio importante
                    </Typography>
                    <Typography component="div" variant="h5" color="text.primary" style={{textAlign: "start", margin: 12}}>
                        uno de nuestros representantes se comunicará con usted si gana por número de teléfono.
                    </Typography>
                    <Divider variant="middle" />
                    <Typography component="div" variant="h5" color="text.primary" style={{textAlign: "start", margin: 12}}>
                        si no podemos comunicarnos con usted por teléfono, le enviaremos un mensaje de texto y un correo electrónico.
                    </Typography>
                </div>

                {user ?
                    <div style={{marginTop: 12}}>
                        <Typography component="div" variant="h5" color="text.primary" style={{color: "blue"}}>
                            <PhoneIcon style={{margin:'0px 10px -4px auto'}}/>{user.phone}
                        </Typography>
                    </div>
                    :
                    null
                }

                {showForm && user?
                    <Grid item sm={12} lg={12} xs={12}>
                        <Button style={{margin: '10px auto 25px auto'}} variant="contained" color="warning" onClick={() => setShowForm(!showForm)}>Cancelar</Button>
                    </Grid>
                    :
                    user?
                        <Grid item sm={12} lg={12} xs={12}>
                            <Button variant="contained" color="primary"
                                    onClick={() => setShowForm(!showForm)}
                                    style={{margin: 10}}
                            >cambiar teléfono</Button>
                        </Grid>
                        :
                        null
                }

                {showForm&&user ?
                    <Grid item sm={12} lg={12} xs={12}>
                        <EditUser phone={user.phone} name={user.name} email={user.email} id={user.uid}/>
                    </Grid>
                    :
                    null
                }
            </Item>
        </Grid>
    );
};

export default InfoWon;