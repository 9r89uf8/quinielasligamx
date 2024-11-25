// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {


        const quinielasSnapshot = await adminDb.firestore().collection('winners')
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .get();


        const quinielas = quinielasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


        return new Response(JSON.stringify(quinielas), {
            status: 200,
            headers: { 'Content-Type': 'application/json','Cache-Control': 'no-store, max-age=0' },
        });
    } catch (error) {
        console.log(error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}