// app/api/posts/create/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
import { authMiddleware } from '@/app/middleware/authMiddleware';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    try {
        await authMiddleware(req);
        const { jornada } = await req.json();


        if (req.user.uid !=='uEDHdyfIFzcjHDZpHrokDBTmQFC2') {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Find all users linked to the cancelled jornada
        const usersSnapshot = await adminDb.firestore().collection('users')
            .where('jornadaId', '==', jornada.id)
            .get();


        let batch = adminDb.firestore().batch();

        usersSnapshot.docs.forEach(userDoc => {
            const userRef = adminDb.firestore().collection('users').doc(userDoc.id);
            const user = userDoc.data();

            // Calculate the new freeQuinielasAmount
            const newFreeQuinielasAmount = (user.freeQuinielasAmount || 0) + (user.userQuinielasAmount || 0);

            // Prepare the update for this user
            batch.update(userRef, {
                freeQuinielasAmount: newFreeQuinielasAmount,
                userQuinielasAmount: 0
            });
        });

        // Commit the batch update
        await batch.commit();

        // Update the user's information in Firestore
        const jornadaRef = adminDb.firestore().collection('jornada').doc(jornada.id);


        await jornadaRef.update({refunded: true});


        // Retrieve the updated user data from Firestore
        const updatedJornadaDoc = await jornadaRef.get();
        let updatedJornadaData = updatedJornadaDoc.data();



        // Add the jornadaId to the jornadaData object
        updatedJornadaData.id = updatedJornadaDoc.id;


        return new Response(JSON.stringify(updatedJornadaData), {
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