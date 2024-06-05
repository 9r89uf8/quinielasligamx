// store/store.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createUserSlice } from './userSlice';
import { createPostSlice } from './postSlice';
import { createNotificationsSlice } from './notificationsSlice';
import { createStripeSlice } from './stripeSlice';
import {createQuinielasSlice} from "@/app/store/quinielasSlice";
import { createJornadaSlice } from './jornadaSlice';
import {createCartSlice} from "@/app/store/cartSlice";
import { createChatSlice } from './chatSlice';

export const useStore = create(
    persist(
        (...a) => ({
            ...createUserSlice(...a),
            ...createPostSlice(...a),
            ...createNotificationsSlice(...a),
            ...createStripeSlice(...a),
            ...createQuinielasSlice(...a),
            ...createJornadaSlice(...a),
            ...createCartSlice(...a),
            ...createChatSlice(...a)
        }),
        {
            name: 'app-storage', // unique name for the storage
            storage: createJSONStorage(() => localStorage), // use local storage
        }
    )
);

export default useStore;



