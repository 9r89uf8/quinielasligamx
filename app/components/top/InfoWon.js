import React, {Fragment, useEffect, useState} from "react";
import EditUser from "@/app/components/user/EditUser";
import { Grid, Typography, Divider } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import PhoneIcon from '@mui/icons-material/Phone';
import BalanceDisplay from "@/app/components/top/BalanceDisplay";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper"; // Adjust the import path as necessary
import Button from '@mui/material/Button';
import WinningsReceptionMethods from "@/app/components/WinningsReceptionMethods";
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: 'linear-gradient(135deg, #f8f9fa, #dee2e6)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: 2,
    borderRadius: 2,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    margin:'12px auto 2px auto'
}));
const InfoWon = ({ user }) => {
    const [showForm, setShowForm] = useState(false);
    return (
        <Grid item sm={12} lg={10} xs={12}>
            <BalanceDisplay/>
        </Grid>
    );
};

export default InfoWon;