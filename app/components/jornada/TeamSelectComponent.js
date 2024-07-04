// TeamSelectComponent.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const teams = [
    { name: "MTY", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/mty.avif", score: '-' },
    { name: "TOL", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/tol.avif", score: '-' },
    { name: "PUM", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/pum.avif", score: '-' },
    { name: "SAN", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/san.avif", score: '-' },
    { name: "LEO", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/leon.avif", score: '-' },
    { name: "ATL", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/atlas.avif", score: '-' },
    { name: "CAZ", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/cruz.avif", score: '-' },
    { name: "TIG", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/tigres.avif", score: '-' },
    { name: "PCH", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/pachuca.avif", score: '-' },
    { name: "AME", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/america.avif", score: '-' },
    { name: "JUA", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/jaguarez.avif", score: '-' },
    { name: "PUE", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/puebla.avif", score: '-' },
    { name: "ASL", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/sanluis.avif", score: '-' },
    { name: "TIJ", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/tijuana.avif", score: '-' },
    { name: "MAZ", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/maza.avif", score: '-' },
    { name: "GDL", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/chivas.avif", score: '-' },
    { name: "QRO", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/queretaro.avif", score: '-' },
    { name: "NEC", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/necaxa.avif", score: '-' }
];

const TeamSelectComponent = ({ selectedTeam, handleChange, label, id }) => (
    <FormControl fullWidth style={{margin: 5}}>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
            labelId={`${id}-label`}
            id={id}
            value={selectedTeam}
            label={label}
            onChange={handleChange}
        >
            {teams.map((team, index) => (
                <MenuItem key={index} value={team}>
                    <img src={team.logo} alt={team.name} style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                    {team.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default TeamSelectComponent;