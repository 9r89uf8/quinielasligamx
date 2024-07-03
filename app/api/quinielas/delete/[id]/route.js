import { adminDb } from '@/app/utils/firebaseAdmin';

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        await adminDb.firestore().collection('quiniela').doc(id).delete();
        return new Response(JSON.stringify({ id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}