// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
import {authMiddleware} from "@/app/middleware/authMiddleware";

export async function POST(req) {


    try {
        await authMiddleware(req);
        const { id } = await req.json();

        if (req.user.uid !=='uEDHdyfIFzcjHDZpHrokDBTmQFC2') {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Get all documents in the 'firstPicks' collection where 'drawMonth' is 'Jul'
        const picturesSnapshot = await admin.firestore().collection('quiniela').where("jornadaId", "==", id).get();

        // Create a batch to perform multiple operations
        const batch = adminDb.firestore().batch();

        // Iterate over each document and add a delete operation to the batch
        picturesSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        // Commit the batch
        await batch.commit();


        return new Response( {
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