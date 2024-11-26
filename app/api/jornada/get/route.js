// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export async function GET() {
    try {
        // Assuming 'startDate' is a timestamp field and 'isActive' is a boolean field
        // First, order by 'startDate' in descending order to get the most recent first
        // Then, filter by 'isActive' to only include active jornadas
        const jornadaSnapshot = await adminDb.firestore().collection('jornada')
            .where('active', '==', true) // Filter for active jornadas
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .limit(1) // Limit to only the most recent active jornada
            .get();

        const jornadaSnapshotTwo = await adminDb.firestore().collection('jornada')
            .where('openToBuy', '==', true) // Filter for active jornadas
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .limit(1) // Limit to only the most recent active jornada
            .get();

        // Since we're using limit(1), there should only be one document
        const latestActiveJornada = jornadaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];

        let buyJornada = []
        if(jornadaSnapshotTwo.empty){
            buyJornada = []
        }else {
            buyJornada = jornadaSnapshotTwo.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
        }

        return new Response(JSON.stringify({active: latestActiveJornada, buy: buyJornada}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log('sv'+error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json','Cache-Control': 'no-store, max-age=0' },
        });
    }
}