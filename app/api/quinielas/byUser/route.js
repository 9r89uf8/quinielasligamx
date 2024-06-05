// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';

export async function POST(req) {
    try {
        const { jornada, user } = await req.json();

        // Check if user is null
        if (!user) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const jornadaDocRef = adminDb.firestore().collection('jornada').doc(jornada.id);
        const jornadaSnapshot = await jornadaDocRef.get();

        // Check if jornada exists
        if (!jornadaSnapshot.exists) {
            return new Response(JSON.stringify({ error: 'Jornada not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const jornadaData = jornadaSnapshot.data();

        const quinielasSnapshot = await adminDb.firestore().collection('quiniela')
            .where('paid', '==', true)
            .where('user', '==', user.uid)
            .where('jornadaId', '==', jornada.id) // Filter for active jornadas
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .get();

        const quinielas = quinielasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Check if no quinielas are found
        if (quinielas.length === 0) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

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

