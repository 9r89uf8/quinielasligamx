// app/api/quinielas/free/route.js
//route for the free quinielas
import { adminDb } from '@/app/utils/firebaseAdmin';
import mailgun from "mailgun-js";

export async function POST(req) {
    try {
        const { jornadaId, userId } = await req.json();


        const quinielasRef = adminDb.firestore().collection('quiniela');
        const quinielasSnapshot = await quinielasRef
            .where('paid', '==', false)
            .where('jornadaId', '==', jornadaId) // Filter for active jornadas
            .where('user', '==', userId)
            .orderBy('timestamp', 'desc') // Ensure you have an index for this query in Firestore
            .get();

        if (quinielasSnapshot.empty) {
            res.status(404).json({ message: 'No active jornadas found.' });
            return;
        }

        // Prepare a batch write
        let batch = adminDb.firestore().batch();

        quinielasSnapshot.docs.forEach(doc => {
            let docRef = quinielasRef.doc(doc.id); // Get a reference to the document
            batch.update(docRef, { paid: true }); // Update the 'paid' field to true
        });

        // Commit the batch
        await batch.commit();

        // // After successful update of quinielas, update the user's quinielas amount
        const userRef = adminDb.firestore().collection('users').doc(userId);
        // // Update user's quinielas amount to the length of the updated quinielas
        // await userRef.update({ userQuinielasAmount: quinielasSnapshot.size, jornadaId: jornadaId, freeQuinielasAmount: 0 });

        // After successful update, create the updated quinielas array
        const updatedQuinielas = quinielasSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            paid: true // Set paid to true as it's now updated
        }));


        const userDoc = await adminDb
            .firestore()
            .collection('users')
            .doc(userId)
            .get();


        const userData = userDoc.data();

        const currentFreeQuinielasAmount = userData.freeQuinielasAmount;
        const currentUserQuinielasAmount = userData.userQuinielasAmount;
        const quinielasPurchased = quinielasSnapshot.size;

        await userRef.update({
            userQuinielasAmount: currentUserQuinielasAmount + quinielasPurchased,
            jornadaId: jornadaId,
            freeQuinielasAmount: currentFreeQuinielasAmount - quinielasPurchased
        });

        const jornadaDocRef = adminDb.firestore().collection('jornada').doc(jornadaId);
        const jornadaSnapshot = await jornadaDocRef.get();
        const jornada = jornadaSnapshot.data();
        const quinielas = quinielasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        let price = 0
        let total = 0
        let totalString = ''
        if(userData.country==='US'){
            price = jornada.price
            total = 0
            totalString = `$0 Dólares`
        }else {
            price = jornada.price*15
            total = 0
            totalString = `$0 Pesos`
        }


        const mailgun = require("mailgun-js");
        const DOMAIN = "emelyaigf.com";
        const mg = mailgun({apiKey: process.env.MAILGUN_API, domain: DOMAIN});
        const data = {
            from: "Compra <mailgun@emelyaigf.com>",
            to: userData.email,
            subject: "Compra de quinielas",
            template: "quinielas",
            'h:X-Mailgun-Variables': JSON.stringify({quinielas: quinielas, id: jornada.id, name: userData.name, quantity: quinielas.length, price: price, total: total, totalString: totalString})
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });



        return new Response(JSON.stringify(updatedQuinielas), {
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
