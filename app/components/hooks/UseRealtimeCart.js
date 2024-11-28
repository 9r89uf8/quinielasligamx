// hooks/useRealtimeCart.js
import { useEffect } from 'react';
import { onSnapshot, collection, query, where, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from "@/app/utils/firebaseClient";
import { useStore } from '@/app/store/store';

export const useRealtimeCart = ({ userId }) => {
    const setCart = useStore((state) => state.setCart);
    const setLoadingCart = useStore((state) => state.setLoadingCart);
    const setUserFreeQuinielasAmount = useStore((state) => state.setUserFreeQuinielasAmount);

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
        const unsubscribeQuinielas = onSnapshot(
            quinielasQuery,
            (snapshot) => {
                const unpaidQuinielas = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCart(unpaidQuinielas);
                setLoadingCart(false);
            },
            (error) => {
                console.error('Error in quinielas subscription:', error);
                setLoadingCart(false);
            }
        );

        // Fetch user's freeQuinielasAmount
        const userDocRef = doc(db, 'users', userId);
        getDoc(userDocRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserFreeQuinielasAmount(userData.freeQuinielasAmount || 0);
                } else {
                    console.log('No such user document!');
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });

        // Cleanup subscription on unmount
        return () => unsubscribeQuinielas();
    }, [userId, setCart, setLoadingCart, setUserFreeQuinielasAmount]);
};
