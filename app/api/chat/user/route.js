// app/api/posts/create/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
import { authMiddleware } from '@/app/middleware/authMiddleware';

export async function POST(req) {
    try {
        const { userId } = await req.json();


        // Get reference to user's 'audios' subcollection
        let messagesRef = adminDb.firestore().collection('users').doc(userId).collection('displayMessages').orderBy('timestamp', 'asc');

        // Get the documents from the 'audios' subcollection
        let messagesDocs = await messagesRef.get();

        // Create an array to store the audio data
        let messageDataArray = [];

        // Loop through the documents and push the audio data to the array
        messagesDocs.forEach((doc) => {
            let messageData = doc.data()
            messageDataArray.push(messageData);
        });

        return new Response(JSON.stringify(messageDataArray), {
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

