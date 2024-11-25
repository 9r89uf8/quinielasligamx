// app/api/posts/route.js
import { adminDb } from '@/app/utils/firebaseAdmin';
import {authMiddleware} from "@/app/middleware/authMiddleware";

export async function POST(req) {

    function generateRandomGamesWinner(games) {
        const guesses = ['L', 'E', 'V'];

        const gamesList = games.map(game => ({
            gameId: game.gameId,
            team1: { name: game.team1.name, logo: game.team1.logo, score: '-' },
            team2: { name: game.team2.name, logo: game.team2.logo, score: '-' },
            // Check if game.result is empty, if so, pick a random guess
            guess: game.result === '' ? guesses[Math.floor(Math.random() * guesses.length)] : game.result,
            result: '',
            gamePlayed: false,
            gameCancelled: false,
            correct: false
        }));


        // Randomize team names and logos according to gameId or keep them generic
        // Adjust this part as necessary to match your actual game data

        return gamesList;
    }


    try {
        await authMiddleware(req);
        const { games, jornada } = await req.json();

        if (req.user.uid !=='uEDHdyfIFzcjHDZpHrokDBTmQFC2') {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const users = [
            { id: 'user01', name: 'CarlosRuiz1987' },
            { id: 'user02', name: 'LuisHdez92' },
            { id: 'user03', name: 'MiguelTorres75' },
            { id: 'user04', name: 'JavierMartinez_04' },
            { id: 'user05', name: 'FranGarcia1990' },
            { id: 'user06', name: 'DanielPerez_88' },
            { id: 'user07', name: 'Roberto_Sanchez' },
            { id: 'user08', name: 'AlejandroVega21' },
            { id: 'user09', name: 'FernandoCruz_1999' },
            { id: 'user10', name: 'RicardoBlanco' },
            { id: 'user11', name: 'JoseManuel_Lopez' },
            { id: 'user12', name: 'MarioRuiz1978' },
            { id: 'user13', name: 'SergioRamos4' },
            { id: 'user14', name: 'PabloGonzalez_05' },
            { id: 'user15', name: 'MarcosDiaz01' },
            { id: 'user16', name: 'Gustavo_Moreno' },
            { id: 'user17', name: 'RaulJimenez77' },
            { id: 'user18', name: 'ErnestoValdez' },
            { id: 'user19', name: 'Pedro_Navarro1992' },
            { id: 'user20', name: 'AlvaroTorres_' },
            { id: 'user21', name: 'Enrique_Solis22' },
            { id: 'user22', name: 'VictorMendez90' },
            { id: 'user23', name: 'OscarLopez_1985' },
            { id: 'user24', name: 'ManuelOrtega_07' },
            { id: 'user25', name: 'JorgeSalinas' },
            { id: 'user26', name: 'IvanCastillo_1991' },
            { id: 'user27', name: 'JuanCarlosVega' },
            { id: 'user28', name: 'DiegoMorales_03' },
            { id: 'user29', name: 'AngelRivera1975' },
            { id: 'user30', name: 'EduardoCampos_88' },
            { id: 'user31', name: 'AntonioRamirez_92' },
            { id: 'user32', name: 'FelipeHernandez04' },
            { id: 'user33', name: 'GabrielMartinez1994' },
            { id: 'user34', name: 'LucasGarcia_76' },
            { id: 'user35', name: 'MateoPerez1979' },
            { id: 'user36', name: 'NicolásLopez_83' },
            { id: 'user37', name: 'OmarSanchez22' },
            { id: 'user38', name: 'PatricioRomero_1995' },
            { id: 'user39', name: 'RafaelAlvarez' },
            { id: 'user40', name: 'SamuelCampos_07' },
            { id: 'user41', name: 'AdrianGonzalez1992' },
            { id: 'user42', name: 'CristianTorres_88' },
            { id: 'user43', name: 'HectorJimenez_2001' },
            { id: 'user44', name: 'IgnacioCruz' },
            { id: 'user45', name: 'JulioBlanco1977' },
            { id: 'user46', name: 'LeonardoDiaz_05' },
            { id: 'user47', name: 'MarcoMoreno' },
            { id: 'user48', name: 'NestorValdez22' },
            { id: 'user49', name: 'RodrigoNavarro_1989' },
            { id: 'user50', name: 'SantiagoVega_1993' },
            { id: 'user51', name: 'AndresSolis_2000' },
            { id: 'user52', name: 'FernandoMendez' },
            { id: 'user53', name: 'GonzaloLopez1978' },
            { id: 'user54', name: 'IsaacOrtega_09' },
            { id: 'user55', name: 'JaimeSalinas_1984' },
            { id: 'user56', name: 'KevinCastillo1996' },
            { id: 'user57', name: 'LuisCarlosMorales' },
            { id: 'user58', name: 'MauricioRivera_76' },
            { id: 'user59', name: 'NoelCampos1987' },
            { id: 'user60', name: 'PabloEduardo_91' }
        ];


        // Run the main logic 50 times
        for (let i = 0; i < 26; i++) {
            const user = users[Math.floor(Math.random() * users.length)]; // Select a random user
            const randomId = user.id; // Assuming the ID is what you refer to as randomId

            // Generate a unique set of games for each user
            const gamesList = generateRandomGamesWinner(games);
            // Generate random country (US or MX)
            const randomCountry = Math.random() < 0.5 ? 'US' : 'MX';
            const postRecord = {
                user: randomId,
                userName: user.name,
                paid: true,
                real: false,
                country: randomCountry,
                jornadaNum: jornada.jornadaNum,
                jornadaId: jornada.id,
                quinielaStarted: false,
                correctAmount: 0,
                winner: false,
                finished: false,
                wonAmount: 0,
                prize: jornada.prize,
                receivedPrize: false,
                games: gamesList,
                timestamp: adminDb.firestore.FieldValue.serverTimestamp()
            };

            // Save the post to Firestore
            await adminDb.firestore().collection('quiniela').add(postRecord);
        }


        return new Response( {
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