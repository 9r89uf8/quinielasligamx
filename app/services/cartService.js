import { useStore } from '../store/store'; // Ensure you import the correct store

export const getCart = async (formData) => {
    const setCart = useStore.getState().setCart;


    try {
        const response = await fetch('/api/cart/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const cart = await response.json();
            setCart(cart);
            return cart;
        } else {
            throw new Error('Failed to update jornada');
        }
    } catch (error) {
        console.error('Error updating jornada:', error);
        return null;
    }
};