// TeamSelectComponent.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const teams = [
    { shortName: "MTY", fullName: "Monterrey", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/mty.avif" },
    { shortName: "TOL", fullName: "Toluca", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/tol.avif" },
    { shortName: "PUM", fullName: "Pumas", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/pum.avif" },
    { shortName: "SAN", fullName: "Santos", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/san.avif" },
    { shortName: "LEO", fullName: "León", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/leon.avif" },
    { shortName: "ATL", fullName: "Atlas", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/atlas.avif" },
    { shortName: "CAZ", fullName: "Cruz Azul", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/cruz.avif" },
    { shortName: "TIG", fullName: "Tigres", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/tigres.avif" },
    { shortName: "PCH", fullName: "Pachuca", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/pachuca.avif" },
    { shortName: "AME", fullName: "América", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/america.avif" },
    { shortName: "JUA", fullName: "Juárez", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/jaguarez.avif" },
    { shortName: "PUE", fullName: "Puebla", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/puebla.avif" },
    { shortName: "ASL", fullName: "San Luis", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/sanluis.avif" },
    { shortName: "TIJ", fullName: "Tijuana", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/tijuana.avif" },
    { shortName: "MAZ", fullName: "Mazatlán FC", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/maza.avif" },
    { shortName: "GDL", fullName: "Guadalajara", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/chivas.avif" },
    { shortName: "QRO", fullName: "Querétaro", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/queretaro.avif" },
    { shortName: "NEC", fullName: "Necaxa", logo: "https://chicagocarhelp.s3.us-east-2.amazonaws.com/necaxa.avif" },

    { shortName: "PSG", fullName: "PSG", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/mcpMspef1hwHwi9qrfp4YQ_48x48.png" },
    { shortName: "MCFC", fullName: "Manchester City", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_48x48.png" },
    { shortName: "SLB", fullName: "Benfica", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/nFwABZ-4n_A3BGXT9A7Adg_96x96.png" },
    { shortName: "BCN", fullName: "Barcelona", logo: "https://ssl.gstatic.com/onebox/media/sports/logos/paYnEE8hcrP96neHRNofhQ_96x96.png" }
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={team.logo} alt={team.shortName} style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                        <span>{team.fullName}</span>
                        <small style={{ marginLeft: '8px', color: 'grey' }}>({team.shortName})</small>
                    </div>
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default TeamSelectComponent;