import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/app/utils/firebaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});

export async function POST(req) {
    const { session_id } = await req.json();

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);


        // First, check if this payment has already been processed
        const paymentsRef = adminDb.firestore().collection('payments');
        const paymentDoc = await paymentsRef.doc(session_id).get();

        if (paymentDoc.exists) {
            // If payment was already processed, return success and the processed quinielas
            const processedPayment = paymentDoc.data();

            // Get the processed quinielas
            const quinielasRef = adminDb.firestore().collection('quiniela');
            const quinielasSnapshot = await quinielasRef
                .where('jornadaId', '==', processedPayment.jornadaId)
                .where('user', '==', processedPayment.userId)
                .where('paid', '==', true)
                .orderBy('timestamp', 'desc')
                .get();

            return NextResponse.json({
                success: true,
                cached: true,
                status: processedPayment.status
            });
        }

        if (session.payment_status === 'paid') {
            const userId = session.metadata.userId;
            const jornadaId = session.metadata.jornadaId;
            const quantity = session.metadata.quantity;

            // Start a Firestore transaction
            const result = await adminDb.firestore().runTransaction(async (transaction) => {
                // 1. First, perform all reads
                const quinielasRef = adminDb.firestore().collection('quiniela');
                const quinielasSnapshot = await transaction.get(
                    quinielasRef
                        .where('paid', '==', false)
                        .where('jornadaId', '==', jornadaId)
                        .where('user', '==', userId)
                        .orderBy('timestamp', 'desc')
                );

                // If no unpaid quinielas found, check if they were already paid
                if (quinielasSnapshot.empty) {
                    const paidQuinielasSnapshot = await transaction.get(
                        quinielasRef
                            .where('paid', '==', true)
                            .where('jornadaId', '==', jornadaId)
                            .where('user', '==', userId)
                            .orderBy('timestamp', 'desc')
                    );

                    // If we find paid quinielas, this might be a refresh - return success
                    if (!paidQuinielasSnapshot.empty) {
                        return {
                            alreadyProcessed: true,
                            userData: null,
                            quinielas: paidQuinielasSnapshot.docs.map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            }))
                        };
                    }

                    throw new Error('No quinielas found.');
                }

                const userRef = adminDb.firestore().collection('users').doc(userId);
                const userDoc = await transaction.get(userRef);
                const userData = userDoc.data();
                const quinielas = quinielasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // 2. Then perform all writes
                quinielasSnapshot.docs.forEach(doc => {
                    transaction.update(quinielasRef.doc(doc.id), { paid: true });
                });

                transaction.update(userRef, {
                    userQuinielasAmount: quinielasSnapshot.size,
                    jornadaId: jornadaId,
                    freeQuinielasAmount: 0
                });

                transaction.set(paymentsRef.doc(session_id), {
                    userId,
                    jornadaId,
                    status: 'completed',
                    timestamp: adminDb.firestore.FieldValue.serverTimestamp(),
                    amount: session.amount_total/100,
                    currency: session.currency,
                    quinielaIds: quinielas.map(q => q.id) // Store the IDs of processed quinielas
                });

                return {
                    alreadyProcessed: false,
                    userData,
                    quinielas
                };
            });

            // Only send email if this wasn't already processed
            if (!result.alreadyProcessed && result.userData) {
                await sendEmailConfirmation(result.userData, result.quinielas, jornadaId);
            }

            return NextResponse.json({ success: true, status: 'completed' });
        } else {
            // Store the failed payment attempt
            await paymentsRef.doc(session_id).set({
                status: 'failed',
                timestamp: adminDb.firestore.FieldValue.serverTimestamp()
            });

            return NextResponse.json({ success: false, status: 'failed' });
        }
    } catch (error) {
        console.error('Payment processing error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function sendEmailConfirmation(userData, quinielas, jornadaId) {
    try {
        const mailgun = require("mailgun-js");
        const DOMAIN = "quinielaligamx.com";
        const mg = mailgun({apiKey: process.env.MAILGUN_API, domain: DOMAIN});

        const jornadaDocRef = adminDb.firestore().collection('jornada').doc(jornadaId);
        const jornadaSnapshot = await jornadaDocRef.get();
        const jornada = jornadaSnapshot.data();

        const price = userData.country === 'US' ? jornada.price : jornada.price * 15;
        const total = quinielas.length * price;
        const totalString = userData.country === 'US' ? `${total} Dólares` : `${total} Pesos`;

        const data = {
            from: "Compra <mailgun@quinielaligamx.com>",
            to: userData.email,
            subject: "Compra de quinielas",
            template: "quiniela",
            'h:X-Mailgun-Variables': JSON.stringify({
                quinielas,
                id: jornada.id,
                name: userData.name,
                quantity: quinielas.length,
                price,
                total,
                totalString
            })
        };

        return mg.messages().send(data);
    } catch (error) {
        console.error('Error sending email confirmation:', error);
        // Don't throw the error as email sending is not critical
    }
}
