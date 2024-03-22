import DB from '$lib/prisma.js'
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {

  const players = await DB.player.findMany();
  const matches = await DB.match.findMany();

  const matchesPerPlayer = players.map((player) => {
    const playedGames = matches.filter((match) => {
      if(match.player1Id === player.id || match.player2Id === player.id) {
        return true;
      } 
      return false;
    })

    const lossess = playedGames.length - player.wins;
    const basicKd = Number((player.wins / lossess).toFixed(2));
    const kd = basicKd === Infinity ? player.wins : basicKd;

    return {
      id: player.id,
      name: player.name,
      amountOfGames: playedGames.length,
      wins: player.wins,
      lossess,
      kd
    }
  })

  return new Response(JSON.stringify({matchesPerPlayer}))
}