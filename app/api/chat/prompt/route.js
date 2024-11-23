import { adminDb } from '@/app/utils/firebaseAdmin';
import { authMiddleware } from '@/app/middleware/authMiddleware';
import OpenAI from 'openai';

export async function POST(req) {
    try {

        const { userMessage, userId, jornada } = await req.json();

        const userDocF = await adminDb
            .firestore()
            .collection('users')
            .doc(userId)
            .get();

        const userData = userDocF.data();

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
                `Quiniela ID: ${quiniela.id}, Winner: ${quiniela.winner ? 'Yes' : 'No'}, Finished: ${quiniela.finished ? 'Yes' : 'No'}, Points: ${quiniela.correctAmount}, QuinielaStarted: ${quiniela.quinielaStarted ? 'Yes' : 'No'}`
            ).join('\n');
        }

        // Get the conversation history from Firestore
        const conversationRef = adminDb.firestore().collection('users').doc(userId).collection('conversations').doc('conversationID1');
        let doc = await conversationRef.get();
        let conversationHistory = doc.exists ? doc.data().messages : [
            {
                "role": "system",
                "content": "You are an assistant for a gaming website. Your primary role is to explain the game's rules," +
                    " manage inquiries about gameplay, and assist users with any " +
                    "questions they might have regarding the game or the game's " +
                    "policies. Here are the key rules and policies you should " +
                    `communicate to users: Each game costs $${jornada.price} dollars to play if they live in the USA and $${jornada.price*15} pesos if they live in Mexico. ` +
                    "Each game is called a Quiniela."+
                    "The game works by asking users to guess the outcome of a game between two teams."+
                    "For each game they have 3 choices, if they think the home team is going to win they must select the letter L, if they think the away team is going to win they must select the letter V, and if they think the game is going to a draw they must select the letter E."+
                    "The game is available exclusively to individuals residing in the USA and Mexico. " +
                    "A player must score 9 points in a Quiniela to win the game. " +
                    "The company is located in downtown Chicago, Il, and was created in 2020."+
                    "The company has given players more than 100k in winning to players in Mexico and USA"+
                    "The user can pay with a credit or debit card."+
                    "The name of the company is QuinielasLigaMx."+
                    "QuinielasLigaMx has 17,000 plus active users."+
                    "The payment is secured by Stripe payments."+
                    "If one game gets cancelled the user does not get the money back, they get free quinielas for the next Quiniela."+
                    `Here is the information about the user: ${formattedUserData}` +
                    "If a user ask if he won just check the user.amountWon key, if the user.country key is US he won dollars else pesos."+
                    `Here is information about the user's Quinielas:\n${formattedQuinielas}` +
                    "If a users makes only 8 points in a single Quiniela he or she wins 2 free Quinielas for the next game."+
                    "Users have to create an account to buy Quinielas."+
                    `The game start on ${jornada.startDate} and ends on ${jornada.endDate}.`+
                    `the current game number is game ${jornada.jornadaNum}.`+
                    "To create an account all you need is a name, email and phone number."+
                    `If a user has 9 points in a single Quiniela he or she wins $${jornada.prize} dollars if he or she lives in the usa or $${jornada.prize*17} pesos if he or she lives in Mexico`+
                    "Winners can withdraw their prize money using Western Union or a bank transfer. " +
                    "The company will contact winners directly via phone call to inform them of their victory and guide them through the prize withdrawal process. " +
                    "Ensure to provide clear, concise, and friendly responses, offering assistance and guidance wherever needed."
            }
        ];

        conversationHistory.push({ "role": "user", "content": userMessage });


        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: conversationHistory,
        });


        const assistantMessage = completion.choices[0].message;
        conversationHistory.push({ "role": "assistant", "content": assistantMessage.content });

        // Save the updated conversation history back to Firestore
        await conversationRef.set({ messages: conversationHistory });

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



