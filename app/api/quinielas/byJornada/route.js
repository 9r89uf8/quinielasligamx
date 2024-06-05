// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';

export async function POST(req) {
    try {
        const { id, user } = await req.json();

        const jornadaDocRef = adminDb.firestore().collection('jornada').doc(id);
        const jornadaSnapshot = await jornadaDocRef.get();

        let jornadaData = {};
        if (jornadaSnapshot.exists) {
            jornadaData = jornadaSnapshot.data();
            jornadaData.id = jornadaSnapshot.id;
        }

        let quinielas = [];
        // Proceed to fetch user-specific quinielas only if user is provided
        if (user && user.uid) {
            const quinielasSnapshot = await adminDb.firestore().collection('quiniela')
                .where('paid', '==', true)
                .where('user', '==', user.uid)
                .where('jornadaId', '==', id) // Filter for active jornadas
                .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
                .get();

            quinielas = quinielasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }

        // Fetch all paid quinielas with correctAmount == 9 for the given jornadaId, regardless of user presence
        const quinielasAllSnapshot = await adminDb.firestore().collection('quiniela')
            .where('paid', '==', true)
            .where('correctAmount', '==', 9)
            .where('jornadaId', '==', id) // Filter for active jornadas
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .get();

        const quinielasAll = quinielasAllSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return new Response(JSON.stringify({userQuinielas: quinielas, jornada: jornadaData, quinielas: quinielasAll}), {
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
