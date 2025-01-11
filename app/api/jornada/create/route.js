// app/api/posts/create/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
import { authMiddleware } from '@/app/middleware/authMiddleware';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    try {
        const authResult = await authMiddleware(req);
        const { user, startDate, endDate, prize, jornadaNum, price, games } = await req.json();


        if (authResult.user.uid !=='uEDHdyfIFzcjHDZpHrokDBTmQFC2') {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        let finalGames = games.map(game => ({
            ...game,
            gamePlayed: false,
            gameCancelled: false,
            gameId: uuidv4(), // Add a unique ID to each game
        }));


        const postRecord = {
            user,
            startDate,
            endDate,
            price: parseInt(price),
            prize: parseInt(prize),
            jornadaNum: parseInt(jornadaNum),
            games: finalGames,
            played: false,
            uniqueId: uuidv4(),
            refunded: false,
            active: false,
            openToBuy: false,
            timestamp: adminDb.firestore.FieldValue.serverTimestamp()
        };

        // Save the post to Firestore
        const postRef = await adminDb.firestore().collection('jornada').add(postRecord);
        const post = { id: postRef.id, ...postRecord };

        return new Response(JSON.stringify(post), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}