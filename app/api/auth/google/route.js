// app/api/auth/google/route.js
import { adminAuth, adminDb } from '@/app/utils/firebaseAdmin';
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const { idToken, country } = await req.json();

        // 1) Verify the ID token using the Admin SDK
        const decoded = await adminAuth.verifyIdToken(idToken);

        // 2) If the user doesn't exist in Firestore, create a new record
        const { uid, email, name, phoneNumber } = decoded;
        const userDoc = await adminDb.firestore().collection('users').doc(uid).get();

        if (!userDoc.exists) {
            await adminDb.firestore().collection('users').doc(uid).set({
                uid,
                email: email || '',
                name: name || '',
                // any other custom fields you want
                phone: phoneNumber || null,
                country: country,
                amountWon: 0,
                freeQuinielasAmount: 0,
                userQuinielasAmount: 0,
                jornadaId: ''
            });
        }

        // 3) Create a session cookie
        const expiresIn = 48 * 60 * 60 * 1000; // 48 hours
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        // Fetch the saved user document from Firestore
        const userDocTwo = await adminDb.firestore().collection('users').doc(uid).get();
        const userData = userDocTwo.data();

        // 4) Set the cookie
        const cookieStore = cookies();
        cookieStore.set('tokenMX', sessionCookie, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: expiresIn / 1000,
        });

        // 5) Return user data
        return new Response(JSON.stringify({ user: userData }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
