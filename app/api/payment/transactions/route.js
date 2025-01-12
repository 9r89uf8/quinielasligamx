// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
import {authMiddleware} from "@/app/middleware/authMiddleware";

export async function GET(req) {
    try {
        const authResult = await authMiddleware(req);

        // Check if user is null
        if (!authResult.authenticated) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const transactionsSnapshot = await adminDb.firestore().collection('payments')
            .where('userId', '==', authResult.user.uid)
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .get();

        const transactions = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Check if no quinielas are found
        if (transactions.length === 0) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(transactions), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}