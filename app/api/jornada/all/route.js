// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';

export async function GET() {
    try {

        const jornadaSnapshot = await adminDb.firestore().collection('jornada')
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .get();

        if (jornadaSnapshot.empty) {
            res.status(404).json({ message: 'No active jornadas found.' });
            return;
        }

        const jornadas = jornadaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return new Response(JSON.stringify(jornadas), {
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