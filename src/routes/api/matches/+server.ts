import DB from '$lib/prisma.js'
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {

  const players = await DB.player.findMany();
  const matches = await DB.match.findMany();

  const getPlayer = (id: number) => {
    const findPlayer = players.find((player) => player.id === id);
    
    return {
      id: findPlayer?.id,
      name: findPlayer?.name,
      teamId: findPlayer?.teamId
    }
  }

  const matchData = matches.map((match) => {
      return {
        id: match.id,
        player1: getPlayer(match.player1Id),
        player2: getPlayer(match.player2Id),
        winner: getPlayer(match.winnerId),
        game_played_at: match.createdAt,
      }
    })

  return new Response(JSON.stringify({matchData, totalMatches: matchData.length}))
}