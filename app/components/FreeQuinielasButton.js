import React from 'react';
import {fetchFreeQuinielas} from "@/app/services/quinielasService";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";



const FreeQuinielasButton = ({country, user, price, jornadaId}) => {
    const router = useRouter();
    const handleClick = async (event) => {
        const paymentData = { userId: user, country: country, price: price, jornadaId: jornadaId};
        await fetchFreeQuinielas(paymentData);
        router.push('/quinielas/user')

    };

    return (
        <Button
            onClick={handleClick}
            style={{
                backgroundImage: 'linear-gradient(45deg, #edf2fb, #d7e3fc)',
                color: 'black',
                padding: '10px 20px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 10
            }}
        >
            Obtener Gratis
        </Button>
    );
};

export default FreeQuinielasButton;