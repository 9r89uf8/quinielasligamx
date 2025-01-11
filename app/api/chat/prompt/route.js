import { adminDb } from '@/app/utils/firebaseAdmin';
import { authMiddleware } from '@/app/middleware/authMiddleware';
import OpenAI from 'openai';

export async function POST(req) {
    try {

        const { userMessage, userId } = await req.json();

        const userDocF = await adminDb
            .firestore()
            .collection('users')
            .doc(userId)
            .get();

        const userData = userDocF.data();

        const jornadaSnapshot = await adminDb.firestore().collection('jornada')
            .where('active', '==', true) // Filter for active jornadas
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .limit(1) // Limit to only the most recent active jornada
            .get();

        // Since we're using limit(1), there should only be one document
        const jornada = jornadaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];

        const quinielasSnapshot = await adminDb.firestore().collection('quiniela')
            .where('paid', '==', true)
            .where('user', '==', userId)
            .where('jornadaId', '==', jornada.id)// Filter for active jornadas
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .get();


        const quinielas = quinielasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        let formattedUserData;
        let formattedQuinielas;
        if(userData&&quinielas){
            formattedUserData = `Name: ${userData.name}, Email: ${userData.email}, Phone: ${userData.phone}, AmountWon: ${userData.amountWon}, Country: ${userData.country}, FreeQuinielas: ${userData.freeQuinielasAmount}`;
            formattedQuinielas = quinielas.map(quiniela =>
                `Quiniela ID: ${quiniela.id}, 
                Winner: ${quiniela.winner ? 'Yes' : 'No'}, 
                Finished: ${quiniela.finished ? 'Yes' : 'No'}, 
                Points: ${quiniela.correctAmount}, 
                Paid: ${quiniela.paid? 'Yes' : 'No'},
                JornadaNum: ${quiniela.jornadaNum}, 
                QuinielaStarted: ${quiniela.quinielaStarted ? 'Yes' : 'No'}`
            ).join('\n');
        }

        const systemPrompt =
            {
                "role": "system",
                "content": "You are an assistant for a gaming website called \"QuinielasLigaMx.\" \n" +
                    "Your primary role is to:\n" +
                    "1. Explain the rules.\n" +
                    "2. Manage inquiries about gameplay (including points, winners, or free entries).\n" +
                    "3. Assist users with any questions regarding the jornada, pricing, prizes, or company policies.\n" +
                    "\n" +
                    "Below are key details you should always keep in mind and communicate clearly:\n" +
                    "\n" +
                    "GAME DETAILS:\n" +
                    `• Current jornada starts on ${jornada.startDate} and ends on ${jornada.endDate}.\n` +
                    `• The current jornada is #${jornada.jornadaNum}.\n` +
                    "• Possible jornada statuses:\n" +
                    "  - \"active\": This is the current/ongoing game.\n" +
                    "  - \"openToBuy\": Users can still purchase new Quinielas for this jornada.\n" +
                    "  - \"played\": All matches in the jornada have ended.\n" +
                    "  \n" +
                    "COST & PRIZES:\n" +
                    "• Cost per Quiniela:\n" +
                    "  - $3.00 (USD) if the user is in the USA.\n" +
                    "  - $45.00 (MXN) if the user is in Mexico.\n" +
                    "• Prize amounts for winners:\n" +
                    "  - $10,000 (USD) for users in the USA.\n" +
                    "  - 150,000 (MXN) for users in Mexico.\n" +
                    "• If a user scores 10 points in a single Quiniela, they win the full prize (depending on their country).\n" +
                    "• If a user scores 9 points in a single Quiniela, they receive 2 free Quinielas for the next jornada.\n" +
                    "• If a match in a jornada is canceled, the user is not refunded but instead receives free Quinielas for the next jornada.\n" +
                    "\n" +
                    "PAYMENT & COMPANY INFO:\n" +
                    "• Users may pay with credit or debit card (secured by Stripe).\n" +
                    "• The company, \"QuinielasLigaMx,\" is located in downtown Chicago and was founded in 2020.\n" +
                    "• It has over 17,000 active users.\n" +
                    "• Winners can withdraw prize money via Western Union or bank transfer.\n" +
                    "• The company will contact winners directly by phone to guide them through the withdrawal process.\n" +
                    "\n" +
                    "USER DETAILS:\n" +
                    `• Name: ${userData.name}\n` +
                    `• Email: ${userData.email}\n` +
                    `• Phone: ${userData.phone}\n` +
                    `• Country: ${userData.country}\n` +
                    `• AmountWon: ${userData.amountWon} (If user is from the US, this is in dollars; if user is from Mexico, this is in pesos.)\n` +
                    `• FreeQuinielas: ${userData.freeQuinielasAmount}} (number of free entries the user currently has)\n` +
                    "\n" +
                    "USER’S QUINIELAS:\n" +
                    "- Quiniela ID: numeric ID\n" +
                    "  - Winner: if the quiniela has 10 or a winner\n" +
                    "  - Finished: if all the games inside the quinela where played\n" +
                    "  - Points: total correct games\n" +
                    "  - Paid: if the quiniela was paid\n" +
                    "  - JornadaNum: the current jornada the quiniela belongs\n" +
                    "  - Quiniela Started: if the jornada has started\n" +
                    ` - All User Quinielas: ${formattedQuinielas}\n` +
                    "\n" +
                    "GENERAL RULES:\n" +
                    "• To play, the user must guess the outcome of each match: \n" +
                    "  - \"L\" if they predict the home team will win.\n" +
                    "  - \"V\" if they predict the away team will win.\n" +
                    "  - \"E\" if they predict a draw.\n" +
                    "• A user must have an account (name, email, phone number) to buy Quinielas.\n" +
                    "• Once a Quiniela is purchased, the user cannot change their picks after the jornada starts.\n" +
                    "• If the user asks, “Did I win?”, check the user’s `amountWon` or see if any of their Quinielas are marked as winners.\n" +
                    "• Provide clear, concise, and friendly responses. Offer assistance wherever needed.\n" +
                    "\n" +
                    "When responding, always:\n" +
                    "• Welcome the user warmly.\n" +
                    "• Answer questions about game rules, pricing, prizes, or the user’s quinielas.\n" +
                    "• Refer to the data above regarding the user, the current jornada, and the user’s quinielas.\n" +
                    "• Keep your answer brief but informative, ensuring clarity on any next steps.\n" +
                    "\n"
            }

        // Reference to the conversation in Firestore (only user + assistant messages)
        const conversationRef = adminDb
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('conversations')
            .doc('conversationID1');

        // Get the conversation from Firestore (if exists)
        let doc = await conversationRef.get();
        let storedMessages = doc.exists ? doc.data().messages : [];
        // 2) Build conversationHistory in memory by prepending systemPrompt
        let conversationHistory = [
            systemPrompt,
            ...storedMessages, // previously saved user and assistant messages
            {
                role: "user",
                content: userMessage,
            },
        ];


        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: conversationHistory,
        });


        const assistantMessage = completion.choices[0].message;
        conversationHistory.push({ "role": "assistant", "content": assistantMessage.content });

        // 6) Before saving to Firestore, strip out any system messages
        const conversationHistoryToStore = conversationHistory.filter(
            (msg) => msg.role !== "system"
        );

        // Save the updated (system-prompt-removed) conversation to Firestore
        await conversationRef.set({ messages: conversationHistoryToStore });

        // Save messages to displayMessages subcollection
        const displayMessageRef = adminDb.firestore().collection('users').doc(userId).collection('displayMessages');
        await displayMessageRef.add({
            role: 'user',
            content: userMessage,
            timestamp: adminDb.firestore.FieldValue.serverTimestamp(),
        });
        await displayMessageRef.add({
            role: 'assistant',
            content: assistantMessage.content,
            timestamp: adminDb.firestore.FieldValue.serverTimestamp(),
        });

        // Fetch updated display messages
        const displayMessagesSnapshot = await displayMessageRef.orderBy('timestamp', 'asc').get();
        const displayMessages = displayMessagesSnapshot.docs.map(doc => doc.data());

        return new Response(JSON.stringify({ assistantMessage, conversationHistory: displayMessages }), {
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



