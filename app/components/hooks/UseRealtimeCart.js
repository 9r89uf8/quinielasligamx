// hooks/useRealtimeChats.js
import { useEffect } from 'react';
import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from "@/app/utils/firebaseClient";
import { useStore } from '@/app/store/store';

export const useRealtimeCart = ({ userId }) => {
    const setCart = useStore((state) => state.setCart);
    const setLoadingCart = useStore((state) => state.setLoadingCart);

    useEffect(() => {
        if (!userId) return;

        setLoadingCart(true);

        // Reference to quiniela collection
        const quinielasRef = collection(db, 'quiniela');

        // Create query with filters and ordering
        const quinielasQuery = query(
            quinielasRef,
            where('user', '==', userId),
            where('paid', '==', false),
            orderBy('timestamp', 'asc')
        );

        // Set up quinielas listener
        const unsubscribe = onSnapshot(quinielasQuery, (snapshot) => {
            const unpaidQuinielas = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCart(unpaidQuinielas);
            setLoadingCart(false);
        }, (error) => {
            console.error('Error in quinielas subscription:', error);
            setLoadingCart(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [userId, setCart, setLoadingCart]);
};