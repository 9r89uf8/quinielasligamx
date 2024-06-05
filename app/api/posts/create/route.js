// app/api/posts/create/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
import { authMiddleware } from '@/app/middleware/authMiddleware';

export async function POST(req) {
    try {
        await authMiddleware(req);
        const { title, content } = await req.json();

        if (!req.user) {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Save the post to Firestore
        const postRef = await adminDb.firestore().collection('posts').add({
            title,
            content,
            userId: req.user.uid,
            timestamp: adminDb.firestore.FieldValue.serverTimestamp(),
        });

        // Fetch the created post
        const postDoc = await postRef.get();
        const post = { id: postDoc.id, ...postDoc.data() };

        return new Response(JSON.stringify(post), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


