// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';

export async function POST(req) {
    try {
        const { jornada } = await req.json();
        const quinielasSnapshot = await adminDb.firestore().collection('quiniela')
            .where('paid', '==', true)
            .where('jornadaId', '==', jornada.id)// Filter for active jornadas
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .get();

        const quinielas = quinielasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(quinielas.length)


        return new Response(JSON.stringify(quinielas), {
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

