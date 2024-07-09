import { adminDb } from '@/app/utils/firebaseAdmin';
import { authMiddleware } from '@/app/middleware/authMiddleware';
import { v4 as uuidv4 } from 'uuid';

async function updateQuinielasGames(quinielas, updatedGames) {
    const gamesToUpdate = updatedGames;
    const gamesArray = Object.values(gamesToUpdate);
    const updatedGamesMap = new Map(gamesArray.map(game => [game.gameId, game]));

    const batch = adminDb.firestore().batch();

    for (const quiniela of quinielas) {
        let correctAmount = 0;
        let gamesPlayedCount = 0;
        quiniela.games.forEach(game => {
            const updatedGame = updatedGamesMap.get(game.gameId);
            if (updatedGame) {
                game.team1.score = updatedGame.team1?.score || game.team1.score;
                game.team2.score = updatedGame.team2?.score || game.team2.score;
                game.result = updatedGame.result;
                game.gamePlayed = updatedGame.gamePlayed;
                game.gameCancelled = updatedGame.gameCancelled;
                game.correct = game.gamePlayed && !game.gameCancelled && game.guess === game.result;

                if (game.correct) {
                    correctAmount++;
                }

                if(updatedGame.gamePlayed){
                    gamesPlayedCount+=1;
                }
            }
        });

        if (correctAmount >= 9) {
            const winnerRecord = {
                user: quiniela.userName,
                jornadaId: quiniela.jornadaId,
                prize: parseInt(quiniela.prize),
                prizeMx: parseInt(quiniela.prize * 15),
                correctAmount: correctAmount,
                jornadaNum: parseInt(quiniela.jornadaNum),
                uniqueId: uuidv4(),
                timestamp: adminDb.firestore.FieldValue.serverTimestamp()
            };
            batch.set(adminDb.firestore().collection('winners').doc(), winnerRecord);

            const userDocRef = adminDb.firestore().collection('users').doc(quiniela.user);
            const userDoc = await userDocRef.get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                const currentAmountWon = userData.amountWon || 0;
                const newAmountWon = parseInt(quiniela.prize);
                const updatedAmountWon = currentAmountWon + newAmountWon;

                batch.update(userDocRef, { amountWon: updatedAmountWon });
            }
        }

        const updateData = {
            games: quiniela.games,
            correctAmount: correctAmount,
            quinielaStarted: true,
            finished: gamesPlayedCount >= 9,
            winner: correctAmount >= 9
        };

        const quinielaDocRef = adminDb.firestore().collection('quiniela').doc(quiniela.id);
        batch.update(quinielaDocRef, updateData);
    }

    await batch.commit();
}

async function updateJornadaGames(quinielas, updatedGames, id) {
    const gamesToUpdate = updatedGames;
    const gamesArray = Object.values(gamesToUpdate);
    const updatedGamesMap = new Map(gamesArray.map(game => [game.gameId, game]));

    const batch = adminDb.firestore().batch();

    for (const quiniela of quinielas) {
        let playedAmount = 0;
        quiniela.games.forEach(game => {
            const updatedGame = updatedGamesMap.get(game.gameId);
            if (updatedGame) {
                game.team1.score = updatedGame.team1?.score || game.team1.score;
                game.team2.score = updatedGame.team2?.score || game.team2.score;
                game.result = updatedGame.result;
                game.gamePlayed = updatedGame.gamePlayed;
                game.gameCancelled = updatedGame.gameCancelled;

                if(updatedGame.gamePlayed){
                    playedAmount+=1;
                }
            }
        });

        const updateData = {
            games: quiniela.games,
            played: playedAmount >= 9
        };

        const jornadaDocRef = adminDb.firestore().collection('jornada').doc(id);
        batch.update(jornadaDocRef, updateData);
    }

    await batch.commit();
}

export async function POST(req) {
    try {
        await authMiddleware(req);
        const { jornada, games } = await req.json();
        let updatedGames = games;

        if (req.user.uid !== 'uEDHdyfIFzcjHDZpHrokDBTmQFC2') {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const quinielasSnapshot = await adminDb.firestore().collection('quiniela')
            .where('paid', '==', true)
            .where('jornadaId', '==', jornada.id)
            .orderBy('timestamp', 'desc')
            .get();

        const quinielas = quinielasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        await updateQuinielasGames(quinielas, updatedGames);
        await updateJornadaGames(quinielas, updatedGames, jornada.id);

        const jornadaDoc = await adminDb.firestore().collection('jornada').doc(jornada.id).get();
        let jornadaData = jornadaDoc.data();
        jornadaData.id = jornadaDoc.id;

        return new Response(JSON.stringify(jornadaData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

