// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
import {authMiddleware} from "@/app/middleware/authMiddleware";

export async function POST(req) {
    try {
        await authMiddleware(req);
        const { games, user, jornada } = await req.json();

        if (!req.user) {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const postRecord = {
            user: user.uid,
            userName: user.name,
            paid: false,
            jornadaNum: jornada.jornadaNum,
            jornadaId: jornada.id,
            quinielaStarted: false,
            correctAmount: 0,
            winner: false,
            finished: false,
            wonAmount: 0,
            prize: jornada.prize,
            receivedPrize: false,
            games,
            timestamp: adminDb.firestore.FieldValue.serverTimestamp()
        };

        // Save the post to Firestore
        const postRef = await adminDb.firestore().collection('quiniela').add(postRecord);

        // Fetch the created post
        const postDoc = await postRef.get();
        const post = { id: postDoc.id, ...postDoc.data() };

        return new Response(JSON.stringify(post), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
